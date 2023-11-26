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
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </Link>

      {/* <Link
        href="/search"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600 text-neutral-600"
      >
        <svg className="w-7 h-7 stroke-0" aria-label="Search" viewBox="0 0 26 26" role="img">
          <title>Search</title>
          <path
            className="fill-current"
            d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
          ></path>
        </svg>
      </Link> */}
      <Link
        href={"/create"}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600"
      >
        <svg className="w-7 h-7 stroke-2" aria-label="Create" viewBox="0 0 26 26" role="img">
          <title>Create</title>
          <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>

      </Link>
      {/* <Link
        href="/activity"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600"
      >
        <svg className="w-7 h-7 stroke-2" aria-label="Notifications" viewBox="0 0 26 26" role="img">
          <title>Notifications</title>
          <path d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z"></path>
        </svg>
      </Link> */}
      <Link
        href="/me"
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
