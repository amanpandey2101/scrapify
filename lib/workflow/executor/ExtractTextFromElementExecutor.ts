import {
  AppNode,
  ExecutionEnviornment,
  LogCollector,
} from "@/lib/types";
import { IWorkflowExecutor } from ".";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import { cheerio } from "cheerio";

export class ExtractTextFromElementExecutor implements IWorkflowExecutor {
  async execute(
    node: AppNode,
    env: ExecutionEnviornment<typeof ExtractTextFromElementTask>,
    log: LogCollector
  ): Promise<boolean> {
    try {
      const selector = env.getInput("Selector");
      const html = env.getInput("HTML");
      const $ = cheerio.load(html);
      const text = $(selector).text();
      env.setOutput("Text", text);
      log.info(`Extracted text from selector: ${selector}`);
      return true;
    } catch (e: any) {
      log.error(`Error extracting text from selector: ${e.message}`);
      return false;
    }
  }
}
