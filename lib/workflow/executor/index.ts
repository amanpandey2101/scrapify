import { AppNode, ExecutionEnviornment, LogCollector } from "@/lib/types";

export interface IWorkflowExecutor {
  execute(
    node: AppNode,
    env: ExecutionEnviornment<any>,
    log: LogCollector
  ): Promise<boolean>;
} 