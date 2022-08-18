export default class SearchEngine {
  docs = [];

  #relevance = {};

  constructor(docs, relevance) {
    this.docs = docs;
    this.#relevance = relevance;
  }

  search = (str) => {
    const result = [];

    for (let i = 0; i < this.docs.length; i += 1) {
      const doc = this.docs[i];

      if (doc.text.match(str)) result.push(doc);
    }

    return result;
  };
}
