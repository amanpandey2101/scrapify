import { ExecutionEnviornment } from "@/lib/types";
import { PageToHtmlTask } from "../task/PageToHtml";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function PageToHtmlExecutor(
  enviornment: ExecutionEnviornment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const puppeteerClient = enviornment.getPage() as unknown as PuppeteerClient;
    const { html } = await puppeteerClient.getPageHtml();
    enviornment.setOutput("HTML", html);
    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
