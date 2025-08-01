import {
  AppNode,
  ExecutionEnviornment,
  LogCollector,
} from "@/lib/types";
import { IWorkflowExecutor } from ".";
import { PageToHtmlTask } from "../task/PageToHtml";

export class PageToHtmlExecutor implements IWorkflowExecutor {
  async execute(
    node: AppNode,
    env: ExecutionEnviornment<typeof PageToHtmlTask>,
    log: LogCollector
  ): Promise<boolean> {
    try {
      const page = env.getPage();
      const html = await page.content();
      env.setOutput("HTML", html);
      log.info("Page content extracted successfully.");
      return true;
    } catch (e: any) {
      log.error(`Error extracting page content: ${e.message}`);
      return false;
    }
  }
}
