const dateFormatter = (a) => {
  const date = Number(
    `${a.date.slice(6)}${a.date.slice(3, 5)}${a.date.slice(0, 2)}`
  );
  console.log(date);
  return date;
};

export { dateFormatter };
