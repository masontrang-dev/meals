import React from "react";

interface DateSelectorProps {
  centerDate: Date;
  setCenterDate: (date: Date) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  centerDate,
  setCenterDate,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold"
        onClick={handlePrev}
        aria-label="Previous Day"
      >
        &uarr; Previous
      </button>
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold"
        onClick={() => setCenterDate(new Date())}
        aria-label="Today"
        disabled={centerDate.toDateString() === new Date().toDateString()}
      >
        Today
      </button>
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold"
        onClick={handleNext}
        aria-label="Next Day"
      >
        Next &darr;
      </button>
    </div>
  );
};

export default DateSelector;
