import { ChatlikeApiEndpoint } from "./subtypes/chatlike-api-endpoint";
import { MakeSystemPrompt } from "./subtypes/make-system-prompt";
import { MinimalChatGPTMessage } from "./subtypes/minimal-chat-gpt-message";

export interface InsertionsApiConfig {
  apiEndpoint: ChatlikeApiEndpoint;
  makeSystemPrompt: MakeSystemPrompt;
  fewShotMessages: MinimalChatGPTMessage[];
  forwardedParams: { [key: string]: any } | undefined;
}

export const defaultInsertionsMakeSystemPrompt: MakeSystemPrompt = (
  textareaPurpose,
  contextString
) => {
  return `You are a versatile writing assistant.
  
The user is writing some text.
The purpose is: \"${textareaPurpose}\"

The user also provides you with a prompt for INSERTIONS into the text they are writing. 
Your job is to come up with an INSERTION into the text that the user would like AS BEST YOU CAN.
Only guess a SHORT distance ahead. Usually 1 sentence, or at most 1 paragraph.

Adjust yourself to the user's style and implied intent.

The user will provide the text before and after the cursor, as well as the insertion prompt. You should use this to infer the best relevant insertion.
<TextAfterCursor>
<TextBeforeCursor>
<InsertionPrompt>
<YourSuggestion>

If we need to add a whitespace character to the suggested text, make sure to explicitly add it in.

The following external context is also provided. Use it to help you make better suggestions!!!
\`\`\`
${contextString}
\`\`\`
`;
};

export const defaultInsertionsFewShotMessages: MinimalChatGPTMessage[] = [
  {
    role: "user",
    name: "TextAfterCursor",
    content:
      "While I was there I also picked up some apples, oranges, and bananas.",
  },
  {
    role: "user",
    name: "TextBeforeCursor",
    content: "This morning I woke up and went straight to the grocery store.",
  },
  {
    role: "user",
    name: "InsertionPrompt",
    content: "I bought a big watermelon",
  },
  {
    role: "assistant",
    content:
      " When I arrived I went straight to the produce section and picked out a big watermelon. ",
  },
  {
    role: "user",
    name: "TextAfterCursor",
    content:
      "and (iii) to the appointment of the Equityholders' Representative pursuant to Section 10.7 of the Merger Agreement and to the provisions thereof.",
  },
  {
    role: "user",
    name: "TextBeforeCursor",
    content:
      'The Optionholder, in the Optionholder\'s capacity as a holder of vested Options, hereby irrevocably and unconditionally agrees: (i) that the Optionholder shall be deemed an "Equityholder" under the Merger Agreement and shall be entitled to the rights and benefits, and subject to the obligations, of an "Equityholder" thereunder;',
  },
  {
    role: "user",
    name: "InsertionPrompt",
    content: "add section about the optionholder's pro rata share",
  },
  {
    role: "assistant",
    content:
      ' (ii) that, for purposes of this Agreement and the Merger Agreement, the applicable percentage set forth opposite the name of the Optionholder in the Distribution Waterfall shall be such the Optionholder\'s "Pro Rata Share"; ',
  },
];

export const defaultInsertionsApiConfig: InsertionsApiConfig = {
  apiEndpoint: ChatlikeApiEndpoint.standardOpenAIEndpoint(
    "/api/copilotkit_chatlike"
  ),
  makeSystemPrompt: defaultInsertionsMakeSystemPrompt,
  fewShotMessages: defaultInsertionsFewShotMessages,
  forwardedParams: undefined,
};