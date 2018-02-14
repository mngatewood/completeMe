var assert = require('chai').assert;

import { makeArray, sortMe, verifySort } from '../lib/insertionSort.js';
import index from '../lib/index.js'

describe('insertion sort', () => {

  var stress = 28000

  it('should generate an array of n numbers', () => {
    var arr = makeArray(stress, 'numbers');
    assert.equal(arr.length, stress);
  })

  it('should sort a small array of numbers', () => {
    assert.equal(verifySort(sortMe(makeArray(5))), true);
  })

  it('should sort a small array of letters', () => {
    assert.equal(verifySort(sortMe(makeArray(5, 'letters'))), true);
  })

  it('should sort positive and negative numbers', () => {
    assert.equal(verifySort(sortMe(makeArray(100, 'numbers', -100, 100))), true);
  }) 

  it('should sort a large array of numbers', () => {
    assert.equal(verifySort(sortMe(makeArray(10000))), true);
  })

  it('should sort a large array of letters', () => {
    assert.equal(verifySort(sortMe(makeArray(10000, 'letters'))), true);
  })

  it('should sort a very large array of letters', () => {
    assert.equal(verifySort(sortMe(makeArray(stress, null, 0, stress))), true);
    console.log(stress)
  })

})
