import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";
import { LayoutGridIcon, LayoutListIcon } from "lucide-react";

export const LayoutToggleButton: React.FC = () => {
  const { layout, toggleLayout } = useLayout();
  const isGridView = layout === "grid";

  return (
    <Button
      size='icon'
      variant='outline'
      onClick={toggleLayout}
      className='h-8 w-8 rounded [&_svg]:w-4'
    >
      {isGridView ? <LayoutListIcon /> : <LayoutGridIcon />}
    </Button>
  );
};
