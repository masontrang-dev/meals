import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AddButtonProps {
  to?: string; // optional, default to /recipes/add
  label?: string; // optional, default to "Add Recipe"
}

const AddButton: React.FC<AddButtonProps> = ({
  to = "/recipes/add",
  label = "Add Recipe",
}) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(to)}
      aria-label={label}
      variant="secondary"
    >
      <span className="text-4xl text-blue-500 mb-2">+</span>
      <span className="text-blue-600 font-semibold text-base text-center px-2 truncate w-full">
        {label}
      </span>
    </Button>
  );
};

export default AddButton;
