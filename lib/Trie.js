import Node from './Node';
import fs from 'fs';

export default class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.head = null;
    this.words = [];
    this.last = false
  }
  
  insert(word) {
    //declare duplicate to default value of false
    let duplicate = false;
    //if array is empty...
    if (this.words != []) {
      //...then check each object in words array...
      this.words.forEach(function(obj) {
        //...if a match is found, reassign duplicate to true
        if (obj.word === word) {
          duplicate = true;
        }
      });
    }
    //if a duplicate was found, stop and return 'duplicate'
    if (duplicate === true) {
      return 'duplicate'
    }
    //if not, push the word object into this.words array
    //and update word count
    this.words.push({'word': word, 'score': 0});
    this.wordCount++;
    
    //function to take in the word and node
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
    }
      addWordToTrie(this, word);
  }

  suggest(prefix) {
    const suggestions = [];
    let currentNode = this;
    let count = 0;
  
  // Traverse down the trie until you get to the end of the 
  // prefix provided by the user. (i.e. if given 'pi', traverse 
  // down the the 'i' node). Set that node the the currentNode
    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
      }
      count++;
    }

  // helper function to recursively search the branches of 
  // child nodes and add complete words as appropriate
    const addSuggestion = (node, prefix) => {
      // console.log(prefix);
      if(node.completeWord) {
        if(node.score === 0) {
          suggestions.push(prefix);
        } else {
        suggestions.unshift(prefix);          
        }
      }
      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;
      // console.log(newString);
        addSuggestion(node.children[child], newString)
      });
    }
  
  // call the recursive function with initial arguments 
  // of the currentNode (the 'i' node in the case of the 
  // prefix 'pi') and the entire prefix itself. This function 
  // will concatenate on letters from its children and push 
  // to the suggestions array whenever a word is complete and 
  // will keep traversing down child branches until no child 
  // branches exist.

    addSuggestion(currentNode, prefix);

    return suggestions;
  }

  populate() {
    const text = "/usr/share/dict/words"
    const dictionary = fs.readFileSync(text).toString().trim().split('\n')
    
    dictionary.forEach(word => {
      this.insert(word);
    });
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
    let count = 0;

    wordArray.forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
    });

    currentNode.completeWord = false;

    var index = this.words.indexOf(word);
    
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }




    // this.words.forEach(function(obj) {
    // // console.log('selection: ', selection, 'object: ', obj);
    // //...if a match is found, reassign duplicate to true
    //   if (obj.word === selection) {
    //     console.log('match found')
    //     obj.score++;
    //   }
    // });
    // }


}
