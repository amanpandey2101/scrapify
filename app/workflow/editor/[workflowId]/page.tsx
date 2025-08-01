import React from "react";
import Editor from "../../_components/Editor";

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;

  // Lazy load dependencies to prevent build-time execution
  const { auth } = await import("@clerk/nextjs/server");
  const { default: prisma } = await import("@/lib/prisma");

  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default WorkflowEditorPage;
