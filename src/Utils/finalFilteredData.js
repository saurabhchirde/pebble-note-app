import { filterByLabel } from "./filterByLabels";
import { sortByDate } from "./sortByDate";
import { sortByPriority } from "./sortByPriority";

const finalFilteredData = (allNotes, filterState) => {
  let filteredArray = [...allNotes];

  filteredArray = filterByLabel(filteredArray, filterState.selectedLabel);
  filteredArray = sortByDate(filteredArray, filterState.sortByDate);
  filteredArray = sortByPriority(filteredArray, filterState.sortByPriority);

  return filteredArray;
};

export { finalFilteredData };
