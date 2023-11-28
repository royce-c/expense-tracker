import FeedPost from "@/app/(home-feed)/feed-post"

import { auth } from "@/auth"
import { userPostsQuery } from "@/db/queries/postsFeed"
import { Suspense } from "react"
import Loading from "@/components/loading"

import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/landing");
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id });

  const parseNumbersFromString = (str: string) => {
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  };

  const totalExpenses = posts.reduce((sum, post) => {
    // Parse numbers from the content and add them to the sum
    const numbersInContent = parseNumbersFromString(post.content);
    const sumOfNumbers = numbersInContent.reduce((acc, num) => acc + num, 0);
    return sum + sumOfNumbers;
  }, 0);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col divide-y p-4 " style={{ height: 3000 }}>
        <div className="text-xl font-bold mb-4">
          Total Expenses: ${(totalExpenses / 100).toFixed(2)}
        </div>
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </Suspense>
  );
}
