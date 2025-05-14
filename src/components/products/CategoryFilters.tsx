import React from "react";
import { HorizontalScroll, CategoryButton } from "./categoryFilter";

type CategoryFiltersProps = {
  categories: readonly string[];
  selected: string;
  onSelect: (cat: string) => void;
};

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, selected, onSelect }) => {
  return (
    <div className="mb-6">
      <HorizontalScroll>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            selected={selected === cat}
            onClick={() => onSelect(cat)}
          />
        ))}
      </HorizontalScroll>
    </div>
  );
};
