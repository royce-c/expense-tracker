import CreatePostForm from "@/app/upload/create-post-form";

import { Suspense } from "react";

import { auth } from "@/auth";

import Loading from "@/components/loading";

import { redirect } from "next/navigation";

// export const runtime = 'edge'

export default async function Create() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  return (
    <Suspense fallback={<Loading />}>
      <CreatePostForm user={session.user} />
    </Suspense>
  );
}
