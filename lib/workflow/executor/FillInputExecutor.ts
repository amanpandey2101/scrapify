import {
  AppNode,
  ExecutionEnviornment,
  LogCollector,
} from "@/lib/types";
import { IWorkflowExecutor } from ".";
import { FillInputTask } from "../task/FillInput";

export class FillInputExecutor implements IWorkflowExecutor {
  async execute(
    node: AppNode,
    env: ExecutionEnviornment<typeof FillInputTask>,
    log: LogCollector
  ): Promise<boolean> {
    try {
      const selector = env.getInput("Selector");
      const text = env.getInput("Text");
      const page = env.getPage();
      await page.waitForSelector(selector);
      await page.type(selector, text);
      log.info(`Filled input with selector: ${selector}`);
      return true;
    } catch (e: any) {
      log.error(`Error filling input with selector: ${e.message}`);
      return false;
    }
  }
}
