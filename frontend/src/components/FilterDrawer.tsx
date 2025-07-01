import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";

interface FilterDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCuisines: string[];
  setSelectedCuisines: (cuisines: string[]) => void;
  selectedMealTypes: string[];
  setSelectedMealTypes: (mealTypes: string[]) => void;
  cuisineTypes: string[];
  mealTypes: string[];
  toggle: (arr: string[], value: string) => string[];
}

// Generic toggle for any array type
function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

interface FilterDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCuisines?: string[];
  setSelectedCuisines?: (cuisines: string[]) => void;
  selectedMealTypes?: string[];
  setSelectedMealTypes?: (mealTypes: string[]) => void;
  cuisineTypes?: string[];
  mealTypes?: string[];
  selectedRatings?: number[];
  setSelectedRatings?: (ratings: number[]) => void;
  selectedPopularity?: string[];
  setSelectedPopularity?: (pop: string[]) => void;
  tagOptions?: string[];
  selectedTags?: string[];
  setSelectedTags?: (tags: string[]) => void;
} // Only one interface, all props optional, no duplicates.


const RATING_OPTIONS = [5, 4, 3, 2, 1];
const POPULARITY_OPTIONS = ["High", "Medium", "Low"];

/**
 * FilterDrawer: Modern filter drawer for recipes/meals.
 * All filter props are optional; pass only those you use.
 * Use a generic toggle<T>(arr: T[], value: T) => T[] for multi-select logic.
 */
const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  setOpen,
  selectedCuisines = [],
  setSelectedCuisines = () => {},
  selectedMealTypes = [],
  setSelectedMealTypes = () => {},
  cuisineTypes = [],
  mealTypes = [],
  selectedRatings = [],
  setSelectedRatings = () => {},
  selectedPopularity = [],
  setSelectedPopularity = () => {},
  tagOptions = [],
  selectedTags = [],
  setSelectedTags = () => {},
}) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button
        aria-label={open ? "Hide filters" : "Show filters"}
        type="button"
        variant="secondary"
      >
        <span>Filters</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent className="flex flex-col h-[80vh] bg-white shadow-xl border border-gray-200">
      <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
        <DrawerTitle className="font-semibold text-lg m-0">Filters</DrawerTitle>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelectedCuisines([]);
              setSelectedMealTypes([]);
              setSelectedRatings([]);
              setSelectedPopularity([]);
              setSelectedTags([]);
            }}
            type="button"
            aria-label="Reset filters"
            variant="secondary"
          >
            Reset
          </Button>
        </div>
      </div>

    


      <div className="overflow-y-auto p-4 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-700 font-medium">Cuisine</span>
          <div className="flex flex-wrap gap-2">
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                type="button"
                onClick={() => setSelectedCuisines(toggle<string>(selectedCuisines, cuisine))}
                variant={selectedCuisines.includes(cuisine) ? "default" : "secondary"}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-700 font-medium">Meal Type</span>
          <div className="flex flex-wrap gap-2">
            {mealTypes.map((mealType) => (
              <Button
                key={mealType}
                type="button"
                onClick={() => setSelectedMealTypes(toggle<string>(selectedMealTypes, mealType))}
                variant={selectedMealTypes.includes(mealType) ? "default" : "secondary"}
              >
                {mealType}
              </Button>
            ))}
          </div>
        </div>  {/* Rating Filter */}
      {/* Rating Filter Placeholder */}
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-gray-700 font-medium">Rating</span>
        <div className="bg-blue-50 text-blue-600 rounded-md px-3 py-2 text-sm font-medium w-fit">Coming soon</div>
      </div>

      {/* Popularity Filter Placeholder */}
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-gray-700 font-medium">Popularity</span>
        <div className="bg-blue-50 text-blue-600 rounded-md px-3 py-2 text-sm font-medium w-fit">Coming soon</div>
      </div>

      {/* Tags Filter Placeholder */}
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-gray-700 font-medium">Tags</span>
        <div className="bg-blue-50 text-blue-600 rounded-md px-3 py-2 text-sm font-medium w-fit">Coming soon</div>
      </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <DrawerClose asChild>
            <Button type="submit" className="w-full" variant="default">
              Apply
            </Button>
          </DrawerClose>
      </div>
    </DrawerContent>
  </Drawer>
);



export default FilterDrawer;
