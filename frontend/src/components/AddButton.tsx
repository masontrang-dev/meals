import React from "react";
import { useNavigate } from "react-router-dom";

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
    <button
      onClick={() => navigate(to)}
      className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-xl border-2 border-dashed border-blue-400 flex flex-col items-center justify-center bg-white hover:bg-blue-50 transition-all duration-200 cursor-pointer shadow-md"
      aria-label={label}
    >
      <span className="text-4xl text-blue-500 mb-2">+</span>
      <span className="text-blue-600 font-semibold text-base text-center px-2 truncate w-full">
        {label}
      </span>
    </button>
  );
};

export default AddButton;
