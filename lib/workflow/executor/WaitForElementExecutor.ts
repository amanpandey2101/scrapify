import { ExecutionEnviornment } from "@/lib/types";
import { WaitForElementTask } from "../task/WaitForElement";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function WaitForElementExecutor(
  enviornment: ExecutionEnviornment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = enviornment.getInput("Selector");
    if (!selector) {
      enviornment.log.error("input -> selector is not defined");
      return false;
    }

    const visibility = enviornment.getInput("Visiblity");
    if (!visibility) {
      enviornment.log.error("input -> visibility is not defined");
      return false;
    }

    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    await puppeteerClient.waitForElement(selector);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
