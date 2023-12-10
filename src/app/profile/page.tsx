import FeedPost from "@/app/(home-feed)/feed-post"
import { userPostsQuery } from "@/db/queries/postsFeed"

import Profile from "./profile"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

import SignoutButton from "./sign-out-button"

import { Suspense } from "react"
import Loading from "@/components/loading"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile")
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id })

  return (
    <Suspense fallback={<Loading />}>
      <Profile user={session.user} />

        <SignoutButton
          signOut={async () => {
            "use server"
            await signOut({redirectTo: "/"})
          }}
        />
      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts?.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Suspense>
  )
}
