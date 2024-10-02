// Contexts.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextProps {
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  sortBy: number;
  setSortBy: React.Dispatch<React.SetStateAction<number>>;
  priceRange: string | null;
  setPriceRange: React.Dispatch<React.SetStateAction<string | null>>;
}

const SortingOptions = {
    PRICE_ASSENDING: 0,
    PRICE_DECENDING: 1,
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<number>(SortingOptions.PRICE_ASSENDING);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  return (
    <FilterContext.Provider value={{ rating, setRating, sortBy, setSortBy, priceRange, setPriceRange }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export {
    useFilterContext,
    FilterProvider
}
