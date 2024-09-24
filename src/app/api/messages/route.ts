import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { auth } from "@/auth";
import { receiptTotalMessage } from "@/lib/messages";

export const runtime = "edge";

type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Model =
  | "gpt-4-vision-preview"
  | "gpt-4-1106-preview"
  | "gpt-3.5-turbo-1106";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ failure: "not authenticated" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let messages: Message[] = [
    {
      role: "user",
      content: content,
    },
  ];

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: "gpt-4o",
    stream: true,
    messages: [...receiptTotalMessage, ...messages],
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
