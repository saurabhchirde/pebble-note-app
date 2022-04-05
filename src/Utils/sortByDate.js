import { dateFormatter } from "./dateFormatter";
const sortByDate = (filteredArray, sortByDate) => {
  const withoutSort = [...filteredArray];
  let tempArray = [];

  if (sortByDate === "New First") {
    tempArray = withoutSort.sort((a, b) => {
      return dateFormatter(b) - dateFormatter(a);
    });
  } else if (sortByDate === "Old First") {
    tempArray = withoutSort.sort((a, b) => {
      return dateFormatter(a) - dateFormatter(b);
    });
  } else {
    return withoutSort;
  }

  return tempArray;
};

export { sortByDate };
