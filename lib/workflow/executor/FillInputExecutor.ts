import { ExecutionEnviornment } from "@/lib/types";
import { FillInputTask } from "../task/FillInput";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function FillInputExecutor(
  enviornment: ExecutionEnviornment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = enviornment.getInput("Selector");
    if (!selector) {
      enviornment.log.error("input -> selector is not defined");
      return false;
    }

    const value = enviornment.getInput("Value");
    if (!value) {
      enviornment.log.error("input -> value is not defined");
      return false;
    }

    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    await puppeteerClient.fillInput(selector, value);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
