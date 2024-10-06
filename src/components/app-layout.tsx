import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Link, Outlet } from "react-router-dom";

import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const AppLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a scroll listener to the window to detect when the user scrolls
  // And update the state to show/hide the shadow on the header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Sticky header with scroll shadow */}
      <div
        className={`w-full bg-background sticky top-0 z-10 border-b  transition-shadow duration-300 ${
          isScrolled && "shadow-sm" // Add shadow when the user scrolls
        }`}
      >
        <header
          className={`w-full max-w-6xl mx-auto   text-lg tracking-tighter px-4 py-2 h-16  flex items-center gap-1`}
        >
          {/* Logo & title */}
          <img src='/popcrown-logo.png' alt='popcrown' className='w-8 h-8' />
          <h1 className='font-bold'>POPCROWN</h1>

          {/* Mode toggle (dark/light theme) */}
          <ModeToggle className='ml-auto w-8 h-8 [&_svg]:w-5' />

          {/* GitHub link */}
          <Link
            to='https://github.com/theBigBengi/top-movies'
            className={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "h-8 w-8 p-0 rounded-full bg-black text-white dark:bg-white dark:text-black ml-1"
            )}
            target='_blank'
          >
            <GithubIcon className='w-5' />
          </Link>
        </header>
      </div>

      {/* Main content */}
      <main className='px-4 pb-20 md:px-8 max-w-6xl mx-auto min-h-[calc(100dvh-106px)]  flex flex-col'>
        <Outlet />
        <Toaster richColors />
      </main>

      {/* Footer */}
      <footer>
        <div className='h-10 w-full text-sm text-muted-foreground  px-4 py-2 text-center'>
          <p>© 2024 Popcrown</p>
        </div>
      </footer>
    </div>
  );
};
