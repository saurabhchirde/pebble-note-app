const sortByPriority = (filteredArray, sortByPriority) => {
  const withoutSort = [...filteredArray];

  if (sortByPriority === "All") {
    return withoutSort;
  }
  return withoutSort.filter((note) => note.priority === sortByPriority);
};

export { sortByPriority };
