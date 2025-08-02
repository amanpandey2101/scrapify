import { ExecutionEnviornment } from "@/lib/types";
import { ScrollToElementTask } from "../task/ScrollToElement";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function ScrollToElementExecutor(
  enviornment: ExecutionEnviornment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = enviornment.getInput("Selector");
    if (!selector) {
      enviornment.log.error("input -> selector is not defined");
      return false;
    }

    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    await puppeteerClient.scrollToElement(selector);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
