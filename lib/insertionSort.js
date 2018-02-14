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

function sortMe (arrayToSort) {
  let sortedArray = [];

  for (let i = 0; arrayToSort.length > 0; i) {
    sortedArray.push(arrayToSort[0]);
    arrayToSort.shift();
    for (let j = sortedArray.length - 1; j > 0; j--) {
      if (sortedArray[j] < sortedArray[j - 1]) {
        [sortedArray[j - 1], sortedArray[j]] = 
        [sortedArray[j], sortedArray[j - 1]];        
      }
    }
  }
  return sortedArray;
}


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