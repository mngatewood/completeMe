const makeArray = function(length, type, min = 0, max = 10) {
  var arrayToSort = [];

  for (var i = 0; i < length; i++) {
    if (type === 'letters') {
      var alphabet = 'abcdefghijklmnopqrstuvwxyz';

      arrayToSort.push(alphabet.charAt(Math.floor(Math.random() * 
        (alphabet.length - 1))));
    } else {
      arrayToSort.push(Math.floor(Math.random() * 
        ((min + max) - min + 1) + min));
    }
  }
  return arrayToSort;
};

const sortMe = function(arrayToSort) {
  if (arrayToSort.length <= 1) {
    return arrayToSort;
  }
  let pivot = arrayToSort.pop();
  let moreArray = [];
  let lessArray = [];

  for (let i = 0; i < arrayToSort.length; i++) {
    if (arrayToSort[i] < pivot) {
      lessArray.push(arrayToSort[i]);
    } else {
      moreArray.push(arrayToSort[i]);
    }
  }
  return [...sortMe(lessArray), pivot, ...sortMe(moreArray)];
};

const verifySort = function(sortedArray) {
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] < sortedArray[i - 1]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  makeArray, 
  sortMe, 
  verifySort
};