import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MoveUpIcon } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Toggle visibility of button when user scrolls
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          variant='secondary'
          onClick={scrollToTop}
          className='fixed active:scale-95 bottom-7    left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-2xl 
            transition-opacity duration-300 ease-in-out opacity-100'
        >
          Scroll to Top <MoveUpIcon className='w-4 h-4 ml-2' />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;
