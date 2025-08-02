import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PuppeteerClient } from "@/lib/puppeteer-client";

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");
    if (!websiteUrl) {
      enviornment.log.error("Website URL is not defined");
      return false;
    }

    // Generate a unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create Puppeteer client
    const puppeteerClient = new PuppeteerClient(sessionId);
    
    // Launch browser via service
    await puppeteerClient.launchBrowser(websiteUrl);
    
    // Store the client in the environment for other executors to use
    enviornment.setBrowser(puppeteerClient as unknown as any);
    enviornment.setPage(puppeteerClient as unknown as any);
    
    enviornment.log.info("Browser launched successfully via Puppeteer service");
    enviornment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
