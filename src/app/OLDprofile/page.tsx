import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
    // return <div>Not logged in</div>;
}
const user = session?.user || {};

  return (
    <div>
      <Image src={user.image} alt="" width={40} height={40} />
      <div>
      Hi {user.name} at {user.email} with id {user.id}
      <pre>{JSON.stringify(session)}</pre>
      <pre>{JSON.stringify(session.user.image)}</pre>
      </div>
    </div>
  );
}
