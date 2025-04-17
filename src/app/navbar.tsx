import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function NavBar({ className }: { className?: string }) {
  return (
    <nav
      className={twMerge(
        "flex h-full justify-between items-center px-2 sm:px-4",
        className
      )}
    >
      <Link
        href="/"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex flex-col sm:flex-row justify-center items-center p-2 rounded-md transition-all fill-none stroke-neutral-600 gap-1"
      >
        <svg
          className="w-6 h-6 stroke-2"
          aria-label="Home"
          viewBox="0 0 26 26"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Home</span>
      </Link>

      <Link
        href={"/upload"}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex flex-col sm:flex-row justify-center items-center p-2 rounded-md transition-all fill-none stroke-neutral-600 gap-1"
      >
        <svg
          className="w-6 h-6 stroke-2"
          aria-label="Upload Receipt"
          viewBox="0 0 26 26"
          role="img"
        >
          <path
            d="M9 8h-3v4h4v-3a1 1 0 0 0-1-1z"
            fill="currentColor"
            stroke="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 15v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M7 10.3V8a1 1 0 0 1 1-1h1M15 11V8a1 1 0 0 0-1-1h-2M9 15h6M12 12v6"
          />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Upload Receipt</span>
      </Link>

      <Link
        href="/profile"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex flex-col sm:flex-row justify-center items-center p-2 rounded-md transition-all fill-none stroke-neutral-600 gap-1"
      >
        <svg
          className="w-6 h-6 stroke-2"
          aria-label="Profile"
          viewBox="0 0 26 26"
          role="img"
        >
          <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Profile</span>
      </Link>
    </nav>
  );
}
