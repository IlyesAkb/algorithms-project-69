import Relevance from '../src/Relevance';

const docs = [
  { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" },
  { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." },
  { id: 'doc3', text: "I'm your shooter." }
];

describe('testing relevance class', () => {
  let relevance = null;

  beforeEach(() => {
    relevance = new Relevance();
  });

  afterEach(() => {
    relevance = null;
  });

  it('should actualize relevance field', () => {
    relevance.actualizeRelevance([docs[0]]);
    relevance.actualizeRelevance([docs[0]]);
    relevance.actualizeRelevance([docs[0]]);
    relevance.actualizeRelevance([docs[0], docs[1]]);
    relevance.actualizeRelevance([docs[0], docs[1]]);
    relevance.actualizeRelevance([docs[0], docs[1]]);
    relevance.actualizeRelevance([docs[0], docs[1], docs[2]]);
    relevance.actualizeRelevance([docs[0], docs[1], docs[2]]);
    relevance.actualizeRelevance([docs[0], docs[1], docs[2]]);

    const expectedValue = {
      doc1: 9,
      doc2: 6,
      doc3: 3
    };

    expect(relevance.metric).toEqual(expectedValue);
  });
});
