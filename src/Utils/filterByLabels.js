const filterByLabel = (filteredArray, selectedLabel) => {
  if (selectedLabel === "All") {
    return filteredArray;
  }
  return filteredArray.filter((note) => note.labels.includes(selectedLabel));
};

export { filterByLabel };
