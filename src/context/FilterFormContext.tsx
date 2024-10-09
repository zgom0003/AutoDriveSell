// Contexts.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextProps {
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  sortBy: number | null;
  setSortBy: React.Dispatch<React.SetStateAction<number | null>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const SortingOptions = {
  PRICE_ASSENDING: 0,
  PRICE_DECENDING: 1,
};

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  return (
    <FilterContext.Provider
      value={{ rating, setRating, sortBy, setSortBy, minPrice, setMinPrice, maxPrice, setMaxPrice }}
    >
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
