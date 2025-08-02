import { ExecutionEnviornment } from "@/lib/types";
import { ClickElementTask } from "../task/ClickElement";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function ClickElementExecutor(
  enviornment: ExecutionEnviornment<typeof ClickElementTask>
): Promise<boolean> {
  try {
    const selector = enviornment.getInput("Selector");
    if (!selector) {
      enviornment.log.error("input -> selector is not defined");
      return false;
    }

    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    await puppeteerClient.clickElement(selector);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
