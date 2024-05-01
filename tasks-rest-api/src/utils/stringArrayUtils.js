export const equals = (array1, array2) => {
  const array2Sorted = array2.slice().sort();
  return (
    array1.length === array2.length &&
    array1
      .slice()
      .sort()
      .every((value, index) => value === array2Sorted[index])
  );
};

export const unique = (array) => [...new Set(array)];

export const isUnique = (array) => unique(array).length === array.length;

export const duplicated = (array) => {
  return unique(array.filter((value, index) => array.indexOf(value) !== index));
};
