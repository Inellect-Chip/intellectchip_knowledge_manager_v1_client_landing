import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 px-16 bg-white dark:bg-black text-center">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold tracking-tighter text-black dark:text-zinc-50">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Page Not Found
          </h2>
          <p className="max-w-md text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            The page you are looking for might have been moved, deleted, or never existed in the first place.
          </p>
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <Link
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
