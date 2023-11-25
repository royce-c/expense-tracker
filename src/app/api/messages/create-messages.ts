// import { db } from "@/db";
// import { messages } from "@/db/schema/messages";

// export async function createMessages({
//   userContent,
//   assistantContent,
//   chatId,
// }: {
//   userContent: string;
//   assistantContent: string;
//   chatId: string;
// }) {
//   await db.insert(messages).values([
//     {
//       chatId,
//       role: "user",
//       content: userContent,
//     },
//     {
//       chatId,
//       role: "assistant",
//       content: assistantContent,
//     },
//   ]);
// }
