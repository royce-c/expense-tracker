import CreatePostForm from "@/app/upload/create-post-form"

import { db, eq } from "@/db"
import { users as usersTable } from "@/db/schema/users"

import { auth } from "@/auth"

import { redirect } from "next/navigation"

// export const runtime = 'edge'

export default async function Create() {
  const session = await auth()
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/upload")
  }

  return <CreatePostForm user={session.user} />
}
