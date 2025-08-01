// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Lazy load dependencies to prevent build-time execution
  const { default: prisma } = await import("@/lib/prisma");
  const {
    ExecutionPhaseStatus,
    WorkflowExecutionStatus,
    WorkflowExecutionTrigger,
  } = await import("@/lib/types");
  const { executeWorkflow } = await import("@/lib/workflow/executeWorkflow");
  const { TaskRegistry } = await import("@/lib/workflow/task/Registry");
  const { timingSafeEqual } = await import("crypto");
  const parser = await import("cron-parser");

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];
  if (!validSecret(secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId");
  if (!workflowId) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });
  if (!workflow) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }

  const executionPlan = JSON.parse(workflow.executionPlan!);

  if (!executionPlan) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }

  try {
    const cron = parser.parseExpression(workflow.cron!, { utc: true });
    const nextRun = cron.next().toDate();

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase: any) =>
            phase.nodes.flatMap((node: any) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type as keyof typeof TaskRegistry].label,
              };
            })
          ),
        },
      },
    });

    await executeWorkflow(execution.id, nextRun);
    return new Response(null, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function validSecret(secret: string) {
  if (!process.env.API_SECRET) return false;

  try {
    const { timingSafeEqual } = require("crypto");
    return timingSafeEqual(
      Buffer.from(secret),
      Buffer.from(process.env.API_SECRET)
    );
  } catch (error) {
    console.log("Invalid Secret");
    return false;
  }
}
