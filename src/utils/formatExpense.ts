
export default function formatPostContent (postContent: any): string {
    const amountInCents: number = parseInt(postContent, 10);
    let amountInDollars: any = amountInCents / 100;
  
    if (!isNaN(amountInDollars)) {
    //   console.log(`Amount in dollars: $${amountInDollars.toFixed(2)}`);
      return `$${amountInDollars.toFixed(2)}`;
    } else {
    //   console.log("Invalid amount");
      amountInDollars = "Error: the AI could not find total amount";
      return amountInDollars;
    }
  };