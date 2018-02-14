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
  if (arrayToSort.length === 1) {
    return arrayToSort;
  } else {
    let middle = Math.floor(arrayToSort.length / 2);
    let leftArray = arrayToSort.slice(0, middle);
    let rightArray = arrayToSort.slice(middle);

    return mergeMe(sortMe(leftArray), sortMe(rightArray));
  }
};

const mergeMe = function(leftArray, rightArray) {
  let result = [];
  let rightIndex = 0;
  let leftIndex = 0;

  while (rightIndex < rightArray.length && leftIndex < leftArray.length) {
    if (rightArray[rightIndex] < leftArray[leftIndex]) {
      result.push(rightArray[rightIndex]);
      rightIndex++;
    } else {
      result.push(leftArray[leftIndex]);
      leftIndex++;
    }
  }
  let left = leftArray.slice(leftIndex);
  let right = rightArray.slice(rightIndex);
  
  return result.concat(left).concat(right);
};

function verifySort(sortedArray) {
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] < sortedArray[i - 1]) {
      return false;
    }
  }
  return true;
}


module.exports = {
  makeArray, 
  sortMe, 
  verifySort
};