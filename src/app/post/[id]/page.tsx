import SinglePost from "@/app/post/[id]/single-post"
import FeedPost from "@/app/(home-feed)/feed-post"

import { notFound } from "next/navigation"

import { singlePostQuery } from "@/db/queries/singlePost"
import { postResponsesQuery } from "@/db/queries/postsFeed"
import { mightFail } from "might-fail"

import { auth } from "@/auth"

export default async function Post({ params }: { params: { id: string } }) {
  const session = await auth()

  const id = Number(params.id)
  if (Number.isNaN(id)) {
    notFound()
  }

  const { result: post, error: getPostError } = await mightFail(
    singlePostQuery.execute({ id }).then((result) => result[0])
  )
  // Only user can see their own posts
  if (session?.user.id !== post?.user.id) {
    notFound()
  }
  if (getPostError) {
    console.error(getPostError)
    return <div>error connecting to database</div>
  }
  if (!post) {
    notFound()
  }

  const { result: postResponses, error: getPostResponsesError } = await mightFail(
    postResponsesQuery.execute({ id })
  )

  if (getPostResponsesError) {
    console.error(getPostError)
    return <div>error connecting to database</div>
  }
  if (!postResponses) {
    notFound()
  }

  return (
    <div className="flex flex-col divide-y">
      <SinglePost post={post} />
      {postResponses.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
