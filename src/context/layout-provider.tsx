import React, { createContext, useState, ReactNode } from "react";

type Layout = "grid" | "row";

export interface LayoutContextProps {
  layout: Layout;
  toggleLayout: () => void;
  toggleInfiniteScroll: () => void;
  InfiniteScroll: boolean;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(
  undefined
);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [layout, setLayout] = useState<Layout>("grid");
  const [InfiniteScroll, setInfiniteScroll] = useState(false);

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "grid" ? "row" : "grid"));
  };

  const toggleInfiniteScroll = () => {
    setInfiniteScroll((prevScrollMode) => !prevScrollMode);
  };

  return (
    <LayoutContext.Provider
      value={{ InfiniteScroll, layout, toggleLayout, toggleInfiniteScroll }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
