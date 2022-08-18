export default class SearchEngine {
  docs = [];

  constructor(docs) {
    this.docs = docs;
  }

  search = (str) => {
    const result = [];

    for (let i = 0; i < this.docs.length; i += 1) {
      const doc = this.docs[i];

      if (doc.text.includes(str)) result.push(doc);
    }

    return result;
  };
}
