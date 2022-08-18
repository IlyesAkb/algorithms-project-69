import SearchEngine from '../src/SearchEngine';

const docs = [
  { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" },
  { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." },
  { id: 'doc3', text: "I'm your shooter." }
];

describe('Testing SearchEngine class', () => {
  it('should return element includes string', () => {
    const searchEngine = new SearchEngine(docs);
    const expectedValue = docs[0];
    const unexpectedValue = docs[2];

    const searchResult = searchEngine.search('straight');

    expect(searchResult.includes(expectedValue)).toBeTruthy();
    expect(searchResult.includes(unexpectedValue)).toBeFalsy();
  });

});
