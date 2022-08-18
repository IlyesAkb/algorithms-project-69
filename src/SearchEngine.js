export default class SearchEngine {
  docs = [];

  #relevance = {};

  constructor(docs, relevance) {
    this.docs = docs;
    this.#relevance = relevance;
  }

  #sortByRelevance = (searchItems) => searchItems.sort((a, b) => {
      if (this.#relevance[a.id] < this.#relevance[b.id]) return -1;
      if (this.#relevance[a.id] > this.#relevance[b.id]) return 1;
      return 0;
    });

  search = (str) => {
    const result = [];

    for (let i = 0; i < this.docs.length; i += 1) {
      const doc = this.docs[i];

      if (doc.text.match(str)) result.push(doc);
    }

    return this.#sortByRelevance(result);
  };
}
