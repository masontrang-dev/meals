import React from "react";

interface ToggleFilterProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  color?: "blue" | "green";
  label?: string;
}

const colorMap = {
  blue: {
    selected: "bg-blue-500 text-white border-blue-500",
    unselected: "bg-white text-blue-700 border-blue-300",
  },
  green: {
    selected: "bg-green-500 text-white border-green-500",
    unselected: "bg-white text-green-700 border-green-300",
  },
};

const ToggleFilter: React.FC<ToggleFilterProps> = ({
  options,
  selected,
  onToggle,
  color = "blue",
  label,
}) => (
  <div className="flex flex-wrap gap-2 mt-2 items-center">
    {label && <span className="mr-2 font-medium text-sm">{label}:</span>}
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className={`px-3 py-1 rounded-full border text-xs font-semibold transition ${
          selected.includes(option)
            ? colorMap[color].selected
            : colorMap[color].unselected
        }`}
        onClick={() => onToggle(option)}
      >
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </button>
    ))}
  </div>
);

export default ToggleFilter;
