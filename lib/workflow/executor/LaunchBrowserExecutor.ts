import {
  AppNode,
  ExecutionEnviornment,
  LogCollector,
} from "@/lib/types";
import { Browser as CoreBrowser, Page as CorePage } from "puppeteer-core";
import { Browser as FullBrowser, Page as FullPage } from "puppeteer";
import { IWorkflowExecutor } from ".";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

type Browser = CoreBrowser | FullBrowser;
type Page = CorePage | FullPage;

export class LaunchBrowserExecutor implements IWorkflowExecutor {
  async execute(
    node: AppNode,
    env: ExecutionEnviornment<typeof LaunchBrowserTask>,
    log: LogCollector
  ): Promise<boolean> {
    try {
      log.info("Launching browser...");
      let browser: Browser | null = null;
      let page: Page | null = null;
      const websiteUrl = env.getInput("Website Url");

      if (process.env.NODE_ENV === "production") {
        browser = await puppeteer.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        });
      } else {
        const puppeteerLocal = await import("puppeteer");
        browser = await puppeteerLocal.launch({
          headless: false,
        });
      }

      if (browser) {
        page = await browser.newPage();
        await page.goto(websiteUrl);
        env.setBrowser(browser as FullBrowser);
        env.setPage(page as FullPage);
        log.info("Browser launched successfully.");
        log.info(`Opened page at: ${websiteUrl}`);
        return true;
      }
      return false;
    } catch (e: any) {
      log.error(`Error launching browser: ${e.message}`);
      return false;
    }
  }
}
