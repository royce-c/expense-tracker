"use server"

import { db, eq } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"
import { media as mediaTable } from "@/db/schema/media"
import { revalidatePath } from "next/cache"

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function deletePost(postId: number) {
  try {
    const deletedMedia = await db
      .delete(mediaTable)
      .where(eq(mediaTable.postId, postId))
      .returning()
      .then((res) => res[0])

    await db.delete(postsTable).where(eq(postsTable.id, postId)).returning()

    if (deletedMedia) {
      const url = deletedMedia.url
      const key = url.split("/").slice(-1)[0]

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      }

      await s3Client.send(new DeleteObjectCommand(deleteParams))
    }

    revalidatePath("/")
  } catch (e) {
    console.error(e)
  }
}