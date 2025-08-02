import { ExecutionEnviornment } from "@/lib/types";
import { NavigateUrlTask } from "../task/NavigateUrl";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function NavigateUrlExecutor(
  enviornment: ExecutionEnviornment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = enviornment.getInput("Url");
    if (!url) {
      enviornment.log.error("input -> Url is not defined");
      return false;
    }

    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    await puppeteerClient.navigate(url);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
