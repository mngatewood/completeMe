import {expect} from 'chai';

import Node from '../lib/Node.js'
import Trie from '../lib/Trie.js'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe.only('Trie', () => {

  describe('insert', () => {

    it('should take in a letter', () => {
      let completion = new Trie();
      completion.insert('p');
      expect(completion.children.p.data).to.equal('p');
    })

    it('should take in a word', () => {
      let completion = new Trie();
      completion.insert('pizza');
      expect(completion.words).to.deep.equal(['pizza']);
    })

    it('should not accept duplicates', () => {
      let completion = new Trie();
      completion.insert('pizza');
      expect(completion.insert('pizza')).to.equal('duplicate')
      expect(completion.words.length).to.equal(1);
      completion.insert('apple');
      expect(completion.words.length).to.equal(2);
    })
 
    it('should mark the end of a word', () => {
      let completion = new Trie();
      completion.insert('pie');
      completion.insert('app');
      expect(completion.children.p.children.i.children.e.completeWord).to.equal(true);
      expect(completion.children.a.children.p.children.p.completeWord).to.equal(true);
      expect(completion.children.p.completeWord).to.equal(false);
    })

    it('should mark the end of nested words appropriately', () => {
      let completion = new Trie();
      completion.insert('pie');
      completion.insert('pies');
      expect(completion.children.p.children.i.completeWord).to.equal(false);
      expect(completion.children.p.children.i.children.e.completeWord).to.equal(true);
      expect(completion.children.p.children.i.children.e.children.s.completeWord).to.equal(true);
    })

    it('should make nodes of word letters', () => {
      let completion = new Trie();
      completion.insert('pizza');
      completion.insert('pizzaria');
      completion.insert('apple');
      expect(Object.keys(completion.children)).to.deep.equal(['p', 'a'])
    })

  })

  describe('suggest', () => {

    it('should suggest a word', () => {
      let completion = new Trie();
      completion.insert('pizza');
      completion.insert('banana');
      completion.insert('apple');
      expect(completion.suggest('pi')).to.deep.equal(['pizza']);
    })

    it('should suggest multiple words', () => {
      let completion = new Trie();
      completion.insert('pizza');
      completion.insert('pizzaria');
      completion.insert('apple');
      expect(completion.suggest('pi')).to.deep.equal(['pizza', 'pizzaria']);
    })

    it('should not suggest words that dont begin with prefix', () => {
      let completion = new Trie();
      completion.insert('pizza');
      completion.insert('pizzaria');
      completion.insert('apple');
      expect(completion.suggest('pi')).to.include('pizza');
      expect(completion.suggest('pi')).to.not.include('apple');
    })

    it('should suggest words after populating the words array', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      expect(completion.suggest('abbas')).to.deep.equal(['abbas', 'abbasi', 'abbassi']);
    })

  })

  describe('populate', () => {

    it('should populate the words array', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      expect(completion.wordCount).to.equal(10000);
      expect(completion.words.length).to.equal(10000);
    })
 
  })

  describe('count', () => {

    it('should keep count of how many words have been inserted', () => {
      let completion = new Trie();
      completion.insert('pizza');
      completion.insert('apple');
      expect(completion.wordCount).to.equal(2);
      expect(completion.words.length).to.equal(2);
      expect(completion.count()).to.equal(2);
    })
  
  })

  describe('select', () => {

    it('should track frequency of selections', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      completion.suggest('an');
      completion.select('ant');
      expect(completion.children.a.children.n.children.t.score).to.equal(1);
    });
    
    it('should prioritize suggestions', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      completion.suggest('ante');
      completion.select('anteal');
      expect((completion.suggest('ante'))[0]).to.equal('anteal');
      completion.select('antenna');
      completion.select('antenna');
      expect((completion.suggest('ante'))[0]).to.equal('antenna');
      expect((completion.suggest('ante'))[1]).to.equal('anteal');
    });
    
  })

  describe('delete', () => {

    it('should delete words from the trie and words array', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      completion.delete('anteater');
      expect(completion.words).to.not.include('anteater');
    });

    it('should decrement the word count when a word is deleted', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      completion.delete('anteater');
      expect(completion.wordCount).to.equal(9999);
      expect(completion.words.length).to.equal(9999);
    })

    it('should not suggest deleted words', () => {
      let completion = new Trie();
      completion.populate(dictionary);
      completion.delete('anteater');
      expect(completion.suggest('ante')).to.not.include('anteater');
    })
  
  })

    // console.log(JSON.stringify(completion, null, 4));

})
