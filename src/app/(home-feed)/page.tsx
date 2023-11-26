import FeedPost from "@/app/(home-feed)/feed-post"

import { postsFeedQuery } from "@/db/queries/postsFeed"
import { auth, signOut } from "@/auth"
import { userPostsQuery } from "@/db/queries/postsFeed"


import { redirect } from "next/navigation"

export default async function Home() {
  // const posts = await postsFeedQuery.execute()

  const session = await auth()
  if (!session?.user) {
    redirect("/landing")
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id })

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
    <div className="flex flex-col divide-y" style={{ height: 3000 }}>
      <div>Total Expenses: ${totalExpenses}</div>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
