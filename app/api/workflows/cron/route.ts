// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: any) {
  try {
    // Lazy load dependencies to prevent build-time execution
    const { getAppUrl } = await import("@/lib/helper");
    const { default: prisma } = await import("@/lib/prisma");
    const { WorkflowStatus } = await import("@/lib/types");

    const now = new Date();

    const workflows = await prisma.workflow.findMany({
      select: {
        id: true,
      },
      where: {
        status: WorkflowStatus.PUBLISHED,
        cron: { not: null },
        nextRunAt: {
          lte: now,
        },
      },
    });
    
    for (const workflow of workflows) {
      triggerWorkflow(workflow.id, getAppUrl);
    }
    
    return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
  } catch (error) {
    // Handle database connection errors gracefully
    console.error("Cron route error:", error);
    return Response.json({ 
      workflowsToRun: 0, 
      error: "Database not available" 
    }, { status: 503 });
  }
}

function triggerWorkflow(workflowId: string, getAppUrl: (path: string) => string) {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );
  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET!}`,
    },
    cache: "no-store",
  }).catch((error: any) => {
    console.error(
      "Error triggering workflow with id",
      workflowId,
      ":error->",
      error.message
    );
  });
}
