import { demoNotes } from "../Data/demoNotes";
const searchData = (filteredArray, bySearch) => {
  // commented for develepment purpose as using demo notes for the review purpose
  // let withoutSearch = [...filteredArray];
  let withoutSearch = [...demoNotes];
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
