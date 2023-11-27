import Image from "next/image"
import Link from "next/link"
import { type Post } from "@/db/queries/postsFeed"
import PostActions from "@/components/post-actions"

import timeAgoShort from "@/utils/timeAgoShort"
import formattedDate from "@/utils/formattedDate"
import formatPostContent from "@/utils/formatExpense"

import { deletePost } from "./actions"

export default function FeedPost({ post }: { post: Post }) {
  function PostMedia() {
    if (!post.media) {
      return null
    }
    if (post.media.type === "image") {
      return (
        <Link href={post.media.url}>
          <div className="rounded-xl w-fill aspect-square relative overflow-hidden">
            <Image className="object-cover" src={post.media.url} alt={post.content} fill={true} />
          </div>
        </Link>
      )
    }
  }

  return (
    <article className="flex flex-col gap-4 py-4 relative">
      <div className="flex gap-4 items-start">
        <Link href={`/profile`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={post.user.image || "https://www.gravatar.com/avatar/?d=mp"}
              alt={post.user.name || "user image"}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <Link href={`/profile`}>
              <div>{post.user.name}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">{formattedDate(new Date(post.createdAt)) +" (Uploaded " + timeAgoShort(new Date(post.createdAt))+" ago)"}</p>
          </div>
          <Link href={`/post/${post.id}`}>
            <p className="font-light">{formatPostContent(post.content)}</p>
          </Link>
          <PostMedia />
          <PostActions
            onDelete={deletePost.bind(null, post.id)}
          />
        </div>
      </div>
    </article>
  )
}
