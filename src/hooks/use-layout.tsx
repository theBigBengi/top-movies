import { useContext } from "react";

import { LayoutContext, LayoutContextProps } from "@/context/layout-provider";

export const useLayout = (): LayoutContextProps => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};
