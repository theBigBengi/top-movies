import React, { createContext, useState, ReactNode } from "react";

type Layout = "grid" | "row";

export interface LayoutContextProps {
  layout: Layout;
  toggleLayout: () => void;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(
  undefined
);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [layout, setLayout] = useState<Layout>("grid");

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "grid" ? "row" : "grid"));
  };

  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
