import Link from "next/link"

import { twMerge } from "tailwind-merge"

export default async function NavBar({ className }: { className?: string }) {

  return (
    <nav className={twMerge("flex h-full justify-between items-center", className)}>
      <Link
        href="/"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600"
      >
        <svg className="w-7 h-7 stroke-2" aria-label="Home" viewBox="0 0 26 26" role="img">
          <title>Home</title>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </Link>

      <Link
        href={"/upload"}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600"
      >
        <svg className="w-7 h-7 stroke-2" aria-label="Create" viewBox="0 0 26 26" role="img">
          <title>Upload</title>
          <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>

      </Link>

      <Link
        href="/profile"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600"
      >
        <svg className="w-7 h-7 stroke-2" aria-label="Profile" viewBox="0 0 26 26" role="img">
          <title>Profile</title>
          <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </Link>

    </nav>
  )
}
