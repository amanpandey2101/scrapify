import { TaskType } from "@/lib/types";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebHookExecutor } from "./DeliverViaWebHookExecutor";
import { ExtractDataWithAiExecutor } from "./ExtractDataWithAiExecutor";
import { ReadPropertyFromJsonExecutor } from "./ReadPropertyFromJsonExecutor";
import { AddPropertyToJsonExecutor } from "./AddPropertyToJsonExecutor ";
import { NavigateUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollToElementExecutor } from "./ScrollToElementExecutor";
import { IWorkflowExecutor } from ".";

type RegistryType = {
  [key in TaskType]: IWorkflowExecutor;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: new LaunchBrowserExecutor(),
  PAGE_TO_HTML: new PageToHtmlExecutor(),
  EXTRACT_TEXT_FROM_ELEMENT: new ExtractTextFromElementExecutor(),
  FILL_INPUT: new FillInputExecutor(),
  CLICK_ELEMENT: new ClickElementExecutor(),
  WAIT_FOR_ELEMENT: new WaitForElementExecutor(),
  DELIVER_VIA_WEBHOOK: new DeliverViaWebHookExecutor(),
  EXTRACT_DATA_WITH_AI: new ExtractDataWithAiExecutor(),
  READ_PROPERTY_FROM_JSON: new ReadPropertyFromJsonExecutor(),
  ADD_PROPERTY_TO_JSON: new AddPropertyToJsonExecutor(),
  NAVIGATE_URL: new NavigateUrlExecutor(),
  SCROLL_TO_ELEMENT: new ScrollToElementExecutor(),
};
