import SearchEngine from '../src/SearchEngine';
import Relevance from '../src/Relevance';

const docs = [
  { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" },
  { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." },
  { id: 'doc3', text: "I'm your shooter." }
];

describe('Testing SearchEngine class', () => {

  let searchEngine;

  beforeEach(() => {
    searchEngine = new SearchEngine(docs, new Relevance());
  });

  afterEach(() => {
    searchEngine = null;
  });

  it('should return element includes string', () => {
    const expectedValue = docs[0];
    const unexpectedValue = docs[2];

    const searchResult = searchEngine.search('straight');
    searchEngine.search('straight hello, world!  test');

    expect(searchResult.includes(expectedValue)).toBeTruthy();
    expect(searchResult.includes(unexpectedValue)).toBeFalsy();
  });

  it('should search docs find regardless of punctuation', () => {
    const expectedValue = docs[0];

    expect(searchEngine.search('pint').includes(expectedValue)).toBeTruthy();
    expect(searchEngine.search('pint!').includes(expectedValue)).toBeTruthy();
  });

  it('should sort documents by goals count', () => {
    let result = [docs[1], docs[0], docs[2]];

    searchEngine.search('thing');
    searchEngine.search('thing');
    searchEngine.search('thing');
    searchEngine.search('thing');

    expect(searchEngine.search('shoot that thing')).toEqual(result);

    searchEngine.search('your');
    searchEngine.search('your');
    searchEngine.search('your');
    searchEngine.search('your');
    searchEngine.search('your');
    searchEngine.search('your');

    result = [docs[1], docs[2], docs[0]];

    expect(searchEngine.search('shoot that thing')).toEqual(result);
  });

});


