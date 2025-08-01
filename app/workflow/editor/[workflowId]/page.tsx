import prisma from "@/lib/prisma";
import { buildSafeQuery } from "@/lib/build-db";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;

  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await buildSafeQuery(
    () => prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId,
      },
    }),
    null
  );
  
  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default WorkflowEditorPage;
