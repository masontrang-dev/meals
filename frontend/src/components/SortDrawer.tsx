import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import { Button } from "@/components/ui/button";

interface SortDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  sort: string;
  setSort: (sort: string) => void;
  sortOptions: { value: string; label: string }[];
}

const SortDrawer: React.FC<SortDrawerProps> = ({ open, setOpen, sort, setSort, sortOptions }) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button
        aria-label={open ? "Hide sort options" : "Show sort options"}
        type="button"
        variant="secondary"
      >
        <span>Sort: {sortOptions.find((opt) => opt.value === sort)?.label || ""}</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent className="p-4 bg-white shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <DrawerTitle className="font-semibold text-lg m-0">Sort By</DrawerTitle>
        <DrawerClose asChild>
          <button
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close sort options"
          >
            <span className="material-icons">close</span>
          </button>
        </DrawerClose>
      </div>
      <div className="flex flex-col gap-2">
        <RadioGroup
          value={sort}
          onValueChange={(value) => {
            setSort(value);
            setOpen(false);
          }}
        >
          {sortOptions.map((option) => {
            const isSelected = sort === option.value;
            return (
              <Button
                key={option.value}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-md border transition text-sm font-medium cursor-pointer select-none mb-1
                  ${isSelected ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}
                `}
                onClick={() => {
                  setSort(option.value);
                  setOpen(false);
                }}
                role="radio"
                aria-checked={isSelected}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer select-none w-full">{option.label}</Label>
              </Button>
            );
          })}
        </RadioGroup>
      </div>
    </DrawerContent>
  </Drawer>
);

export default SortDrawer;
