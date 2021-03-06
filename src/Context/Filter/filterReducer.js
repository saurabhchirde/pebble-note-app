const filterReducer = (filterState, action) => {
  switch (action.type) {
    case "byDate":
      return {
        ...filterState,
        sortByDate: action.payload,
      };

    case "byPriority":
      return { ...filterState, sortByPriority: action.payload };

    case "byLabel":
      return {
        ...filterState,
        selectedLabel: action.payload,
      };

    case "bySearch":
      return {
        ...filterState,
        bySearch: action.payload,
      };

    case "resetFilter":
      return {
        sortByDate: "Newest",
        sortByPriority: "All",
        selectedLabel: "All",
        bySearch: "",
      };

    default:
      return filterState;
  }
};

export { filterReducer };
