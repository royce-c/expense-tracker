
export type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

export const receiptTotalMessage: Message[] = [
  {
    role: "system",
    content: "You are an expert at reading receipts and invoices then returning the total cost in cents. If the receipt is not readable, return 'Error'."
  },
  {
    role: "user",
    content: "Please read the receipt and return the total cost. Only return the total cost, no other text.",
  },
];