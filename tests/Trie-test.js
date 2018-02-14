import {expect} from 'chai';

import Node from '../lib/Node.js'
import Trie from '../lib/Trie.js'


describe.only('Trie', () => {

  let completion = new Trie();

  it('should take in a word', () => {
    let completion = new Trie();
    completion.insert('pizza');
    console.log(completion.insert('pizza'));
    expect(completion.insert('pizza')).to.equal('duplicate');
    expect(completion.words.length).to.equal(1);

  })

  it('should keep count of how many words have been inserted', () => {
    let completion = new Trie();
    completion.insert('pizza');
    completion.insert('apple');
    // console.log(completion.words)
    expect(completion.wordCount).to.equal(2);
  })

  it('should not accept duplicates', () => {
    let completion = new Trie();
    completion.insert('pizza');
    expect(completion.insert('pizza')).to.equal('duplicate')
  })

  it('should make a bunch of nodes', () => {
    let completion = new Trie();
    completion.insert('pizza');
    completion.insert('pizzaria');
    completion.insert('apple');
    expect(Object.keys(completion.children)).to.deep.equal(['p', 'a'])
    // console.log(JSON.stringify(completion, null, 4));
    // console.log(Object.keys(completion.children));
  })

  it('should suggest some words', () => {
    let completion = new Trie();
    completion.insert('pizza');
    completion.insert('pizzaria');
    completion.insert('apple');
    completion.suggest('pi');
    // console.log(completion.suggest('pi'));
  })

  it.only('should populate the words array', () => {
    completion.populate();
    expect(completion.wordCount).to.equal(235886);
  })

  it('should track frequency of selections and prioritize suggestions', () => {
    completion.populate();
    completion.suggest('ante');
// => ['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle', ...]
    completion.select('anteal');
    console.log(completion.suggest('ante'))
// => ['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle', ...]
    expect(completion.suggest('ante')[0]).to.equal('anteal')
  });

  it.only('should delete words from the trie and words array', () => {
    completion.suggest('ante');
    console.log(completion.suggest('ante'));

// => ['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle', ...]
    
    completion.delete('anteater');
    completion.suggest('ante')
    console.log(completion.suggest('ante'));
// => ['pizzeria', 'pize', 'pizza', 'pizzicato', ...]
    expect(completion.words).to.not.include('ante');
  });








  
})
