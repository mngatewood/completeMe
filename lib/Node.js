export default class Node {
  constructor (data) {
    this.children = {};
    this.completeWord = false;
    this.data = data;
    this.score = 0;
  }

  // insert(value) {
  //   this.words.push(value);
  //   this.count++
  // }

  // count() {
  //   return this.count;
  // }

}
