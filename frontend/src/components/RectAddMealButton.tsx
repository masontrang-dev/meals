import React from "react";
import { Button } from "@/components/ui/button";

interface RectAddMealButtonProps {
  onClick: () => void;
  label?: string;
}

const RectAddMealButton: React.FC<RectAddMealButtonProps> = ({
  onClick,
  label = "Add Meal",
}) => (
  <Button
    onClick={onClick}
    title={label}
    aria-label={label}
    type="button"
  >
    {label}
  </Button>
);

export default RectAddMealButton;
