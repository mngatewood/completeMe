import Node from './Node';

export default class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.head = null;
    this.words = [];
    this.last = false;
  }
  
  insert(word) {
    let duplicate = false;

    if (this.words !== []) {
      this.words.forEach(function(value) {
        if (value === word) {
          duplicate = true;
        }
      });
    }
    if (duplicate === true) {
      return 'duplicate';
    }
    this.words.push(word);
    this.wordCount++;

    const addWordToTrie = (node, word) => {

      const firstLetter = word[0];

      if (!node.children[firstLetter]) {
        node.children[firstLetter] = new Node(firstLetter);
      }
      if (word.length === 1) {
        node.children[firstLetter].completeWord = true;
      }
      if (word.length > 1) {
        addWordToTrie(node.children[firstLetter], word.slice(1));
      }
    };
    addWordToTrie(this, word);
  }

  suggest(prefix) {
    const suggestions = [];
    let currentNode = this;
    let count = 0;

    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
      }
      count++;
    }


    const addSuggestion = (node, prefix) => {
      
      if (node.completeWord) {
        if (node.score === 0) {
          suggestions.push(prefix);
        } else {
          suggestions.unshift(prefix);          
        }
      }
      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;

        addSuggestion(node.children[child], newString);
      });
    };
    addSuggestion(currentNode, prefix);
    return suggestions;
  }

  populate(dictionary) {
    let start = 0;
    let end = 10000;

    for (let i = 0; i < 1; i++) {
      for (let j = start; j < end; j++) {
        this.insert(dictionary[j]);
      }
      start = start + 10000;
      end = end + 10000;
    }
  }

  count() {
    return this.wordCount;
  }

  select(selection) {
    let wordArray = selection.split('');
    let currentNode = this;

    wordArray.forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
    });
    currentNode.score++;
  }

  delete(word) {
    let wordArray = word.split('');
    let currentNode = this;

    wordArray.forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
    });
    currentNode.completeWord = false;
    var index = this.words.indexOf(word);
    
    if (index >= 0) {
      this.words.splice(index, 1);
    }
  }
}