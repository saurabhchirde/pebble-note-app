import { filterByLabel } from "./filterByLabels";
import { sortByDate } from "./sortByDate";
import { sortByPriority } from "./sortByPriority";
import { searchData } from "./searchData";

const finalFilteredData = (allNotes, filterState) => {
  let filteredArray = [...allNotes];

  filteredArray = filterByLabel(filteredArray, filterState.selectedLabel);
  filteredArray = sortByDate(filteredArray, filterState.sortByDate);
  filteredArray = sortByPriority(filteredArray, filterState.sortByPriority);
  filteredArray = searchData(filteredArray, filterState.bySearch);

  return filteredArray;
};

export { finalFilteredData };
