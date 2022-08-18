export default class SearchEngine {
  docs = [];

  constructor(docs) {
    this.docs = docs;
  }

  search = (str) => {
    const result = [];
    // const preparedWord = str.match(/\w+/);

    for (let i = 0; i < this.docs.length; i += 1) {
      const doc = this.docs[i];

      if (doc.text.match(str)) result.push(doc);
    }

    return result;
  };
}
