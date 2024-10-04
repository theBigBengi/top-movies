import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

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
        className={`w-full bg-background sticky top-0 z-10  transition-shadow duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <header
          className={`w-full max-w-7xl mx-auto  text-xl tracking-tight px-4 py-2  flex items-center gap-1`}
        >
          <img src='popcrown-logo.png' alt='popcrown' className='w-8 h-8' />
          <h1 className='font-extrabold'>POPCROWN</h1>
          <ModeToggle className='ml-auto w-8 h-8' />
        </header>
      </div>
      <main className='p-4 max-w-7xl mx-auto'>
        <Outlet />
      </main>
      <footer>
        <div className='w-full bg-background text-xl tracking-tight px-4 py-2 sticky bottom-0 z-10 flex items-center gap-1 '>
          <p>© 2024 Popcrown</p>
        </div>
      </footer>
    </div>
  );
};
