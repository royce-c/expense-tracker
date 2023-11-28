import Link from "next/link";

import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Expense Tracker
          </h1>
          <p className="text-gray-600 mb-8">
            Harness the power of AI to keep track of your expenses and manage
            your budget effectively.
          </p>
          <Link href="/api/auth/signin">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </Suspense>
  );
}
