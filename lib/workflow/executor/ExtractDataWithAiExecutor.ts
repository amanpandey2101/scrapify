import { ExecutionEnviornment } from "@/lib/types";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/credential";
import OpenAi from "openai";

export async function ExtractDataWithAiExecutor(
  enviornment: ExecutionEnviornment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentialId = enviornment.getInput("Credentials");
    if (!credentialId) {
      enviornment.log.error("input -> credentials is not defined");
      return false;
    }
    const content = enviornment.getInput("Content");
    if (!content) {
      enviornment.log.error("input -> content is not defined");
      return false;
    }
    console.log("Content being sent to AI:", content.substring(0, 500) + "...");
    
    const prompt = enviornment.getInput("Prompt");
    if (!prompt) {
      enviornment.log.error("input -> prompt is not defined");
      return false;
    }
    console.log("Prompt being sent to AI:", prompt);

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentialId,
      },
    });

    if (!credential) {
      enviornment.log.error("Credential no found");
      return false;
    }

    let plainCredentialValue;
    try {
      plainCredentialValue = symmetricDecrypt(credential.value);
      console.log("Plain Credential Value", plainCredentialValue);
    } catch (error: any) {
      console.log(error);
      enviornment.log.error(`Cannot decrypt credential: ${error.message}`);
      enviornment.log.error("Make sure ENCRYPTION_KEY environment variable is set");
      return false;
    }

    if (!plainCredentialValue) {
      enviornment.log.error("Cannot decrypt credential - empty value returned");
      console.log(plainCredentialValue);
      return false;
    }

    const openAi = new OpenAi({
      apiKey: plainCredentialValue,
    });

    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that processes and extracts data from HTML or text. You will be given content and a prompt describing what to do with it. If the prompt asks for data extraction (like 'extract product names', 'get prices', etc.), return the results as a JSON array or object. If the prompt asks for text processing (like 'summarize', 'analyze', 'describe', etc.), return the processed text directly as a string. Always follow the prompt instructions precisely and provide only the requested output without additional explanations.",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });
    console.log("Response", response);
    enviornment.log.info(
      `Prompt tokens used: ${JSON.stringify(response.usage?.prompt_tokens)}`
    );

    enviornment.log.info(
      `Completition tokens used: ${JSON.stringify(
        response.usage?.completion_tokens
      )}`
    );

    const result = response.choices[0].message?.content;

    if (!result) {
      enviornment.log.error("Empty response from AI");
      return false;
    }

    enviornment.setOutput("Extracted Data", JSON.stringify(result));

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
