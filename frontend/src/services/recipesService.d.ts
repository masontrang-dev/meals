export interface Recipe {
  id: string;
  image: string;
  title: string;
  description?: string;
  calories?: number;
}

export declare function fetchTopRecipes(): Promise<Recipe[]>;
