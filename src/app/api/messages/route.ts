import { type NextRequest } from "next/server";

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "edge";

type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

const initialProgrammerMessages: Message[] = [
  {
    role: "system",
    content: "You are an expert at reading receipts and invoices then returning the total cost. If the receipt is not readable, return 'Error'."
  },
  {
    role: "user",
    content: "Please read the receipt and return the total cost. Only return the total cost, no other text.",
  },
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Model =
  | "gpt-4-vision-preview"
  | "gpt-4-1106-preview"
  | "gpt-3.5-turbo-1106";

export async function POST(req: NextRequest) {
  const { content, chatId } = await req.json();

  // verify the user is logged in
  // verify the chatId is valid
  // verify it belongs to the user

  let messages: Message[] = [
    {
      role: "user",
      content: content,
    },
  ];

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    // model: "gpt-4-1106-preview",
    model: "gpt-4-vision-preview",
    stream: true,
    messages: [...initialProgrammerMessages, ...messages],
    max_tokens: 4096,
  };

  const iterator = await openai.chat.completions.create(params);

  const stream = OpenAIStream(iterator, {
    async onStart() {
      console.log("onStart");
    },
    async onCompletion(completion) {
      console.log("onCompletion", completion);
      // revalidatePath("/");
    },
  });

  return new StreamingTextResponse(stream);
}
