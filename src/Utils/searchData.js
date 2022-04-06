const searchData = (filteredArray, bySearch) => {
  let withoutSearch = [...filteredArray];
  let tempArray = [];
  if (bySearch === "") {
    return withoutSearch;
  } else {
    tempArray.push(
      ...withoutSearch.filter(
        (note) =>
          note.title.toLowerCase().includes(bySearch.toLowerCase()) ||
          note.text.toLowerCase().includes(bySearch.toLowerCase())
      )
    );
  }
  return tempArray;
};

export { searchData };
