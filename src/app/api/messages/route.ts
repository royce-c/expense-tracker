import { type NextRequest } from "next/server";

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// import { createMessages } from "./create-messages";

import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "edge";

// import { initialProgrammerMessages, Message } from "@/lib/messages";

type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

// {
//   role: "system",
//   content:
//     "return the text from the image in the following format exactly, nothing else: {text: 'text from image'}",
// },

const initialProgrammerMessages: Message[] = [
  {
    role: "system",
    content:
      "return the text from the image",
  },
  {
    role: "user",
    content:
      "",
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
    // messages: [...initialProgrammerMessages, ...messages],
    messages: [...initialProgrammerMessages, ...messages],
    max_tokens: 4096,
  };

  const iterator = await openai.chat.completions.create(params);

  const stream = OpenAIStream(iterator, {
    async onStart() {
      console.log("onStart");
    },
    // async onFinal(completion) {
    //   console.log("onfinal", completion);
    //   revalidateTag("getChats");
    // },
    async onCompletion(completion) {
      console.log("onCompletion", completion);

      // try {
      //   await createMessages({
      //     userContent: content,
      //     assistantContent: completion,
      //     chatId: chatId,
      //   });
      // } catch (e) {
      //   console.error(e);
      // }

      // console.log("Stream completed");
      // console.log(completion);

      // revalidatePath("/");
    },
    // async onToken(token) {
    //   console.log("onToken", token);
    // },
  });

  return new StreamingTextResponse(stream);
}
