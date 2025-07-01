import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    type="text"
    placeholder={placeholder || "Search..."}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded px-2 py-1 text-sm w-full sm:w-64"
  />
);

export default SearchInput;
