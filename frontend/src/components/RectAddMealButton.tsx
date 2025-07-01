import React from "react";

interface RectAddMealButtonProps {
  onClick: () => void;
  label?: string;
}

const RectAddMealButton: React.FC<RectAddMealButtonProps> = ({
  onClick,
  label = "Add Meal",
}) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    className="ml-auto px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
    type="button"
  >
    {label}
  </button>
);

export default RectAddMealButton;
