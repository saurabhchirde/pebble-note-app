import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "./filterReducer";

const filterContext = createContext(null);

const filterInitialState = {
  sortByDate: "Newest",
  sortByPriority: "All",
  selectedLabel: "All",
  bySearch: "",
};

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [showFilter, setShowFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <filterContext.Provider
      value={{
        filterState,
        filterDispatch,
        showFilter,
        setShowFilter,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

const useFilter = () => useContext(filterContext);

export { FilterProvider, useFilter };
