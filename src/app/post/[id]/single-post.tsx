import Image from "next/image"
import Link from "next/link"
import { type Post } from "@/db/queries/singlePost"
import PostActions from "@/components/post-actions"

import timeAgoShort from "@/utils/timeAgoShort"
import formatPostContent from "@/utils/formatExpense"

export default function SinglePost({ post }: { post: Post }) {
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
    <article className="flex flex-col gap-2 py-2">
      <div className="flex gap-4 items-start">
        <Link href={`/profile`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={post.user.image || "https://www.gravatar.com/avatar/?d=mp"}
              alt={post.user.name || "User image"}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between">
            <Link href={`/profile`}>
              <div>{post.user.name}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">{timeAgoShort(new Date(post.createdAt))}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <p className="font-light">{formatPostContent(post.content)}</p>
        <PostMedia />
        <PostActions
          onDelete={async () => {
            "use server"
            console.log("delete")
          }}
        />
      </div>
    </article>
  )
}
