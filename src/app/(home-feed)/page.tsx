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


  return (
    <div className="flex flex-col divide-y" style={{ height: 3000 }}>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
