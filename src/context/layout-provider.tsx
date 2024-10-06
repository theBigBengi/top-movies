import React, { createContext, useState, ReactNode } from "react";

type Layout = "grid" | "row";

export interface LayoutContextProps {
  layout: Layout;
  toggleLayout: () => void;
  isGrid: boolean;
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

  const isGrid = layout === "grid";

  return (
    <LayoutContext.Provider
      value={{
        isGrid,
        layout,
        toggleLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
