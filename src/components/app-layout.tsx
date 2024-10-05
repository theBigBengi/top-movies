import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Link, Outlet } from "react-router-dom";

import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const AppLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div
        className={`w-full bg-background sticky top-0 z-10 border-b  transition-shadow duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <header
          className={`w-full max-w-7xl mx-auto   text-lg tracking-tighter px-4 py-2 h-16  flex items-center gap-1`}
        >
          <img src='popcrown-logo.png' alt='popcrown' className='w-8 h-8' />
          <h1 className='font-bold'>POPCROWN</h1>
          <ModeToggle className='ml-auto w-7 h-7 [&_svg]:w-4' />

          <Link
            to='https://github.com/theBigBengi/top-movies'
            className={cn(
              buttonVariants({ size: "icon", variant: "outline" }),
              "h-7 w-7 p-0"
            )}
            target='_blank'
          >
            <GithubIcon className='w-4' />
          </Link>
        </header>
      </div>
      <main className='px-4 pb-20 md:px-8 max-w-7xl mx-auto min-h-[calc(100dvh-106px)]'>
        <Outlet />
        <Toaster richColors />
      </main>
      <footer>
        <div className='h-10 w-full text-sm text-muted-foreground  px-4 py-2 text-center'>
          <p>© 2024 Popcrown</p>
        </div>
      </footer>
    </div>
  );
};
