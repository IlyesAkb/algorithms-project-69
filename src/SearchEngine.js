function getSearchStringWords(str) {
  const filteredString = str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, " ");
  return filteredString.split(' ');
}

export default class SearchEngine {
  docs = {};

  index = {};

  #relevance;

  constructor(docs, relevance) {
    this.#relevance = relevance;
    this.#prepareDocuments(docs);
  }

  #sortResult = (docs, goals) => docs.sort((a, b) => {
    const aGoals = goals[a.id] ?? 0;
    const bGoals = goals[b.id] ?? 0;
    const aRelevance = this.#relevance.metric[a.id] ?? 0;
    const bRelevance = this.#relevance.metric[b.id] ?? 0;
    if (aGoals > bGoals) return -1;
    if (bGoals > aGoals) return 1;
    if (aRelevance > bRelevance) return -1;
    if (bRelevance > aRelevance) return 1;
    return 0;
  });

  search = (str) => {
    const goals = {};

    const words = getSearchStringWords(str);

    const docs = this.#getDocsByIndexWords(words);

    const result = [];

    for (let i = 0; i < docs.length; i += 1) {
      const doc = docs[i];

      let isAppropriate = false;

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const regex = new RegExp(word, 'g');
        const matches = doc.text.match(regex);

        if (matches) {

          if (!isAppropriate) isAppropriate = true;

          const goalsCount = goals[doc.id];

          if (!goalsCount) goals[doc.id] = matches.length;
          else goals[doc.id] += matches.length;
        }
      }

      if (isAppropriate) result.push(doc);
    }

    this.#relevance.actualizeRelevance(result);

    return this.#sortResult(result, goals);
  };

  #prepareDocuments = (docs) => {
    const indexWords = new Set();
    const sanitizedDocs = [];

    for (let i = 0; i < docs.length; i += 1) {
      const doc = docs[i];

      this.docs[doc.id] = doc;

      const words = getSearchStringWords(doc.text);

      sanitizedDocs.push({ id: doc.id, text: words});

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        indexWords.add(word.toLowerCase());
      }
    }

    indexWords.forEach(word => {
      for (let i = 0; i < sanitizedDocs.length; i += 1) {
        const doc = docs[i];

        if (doc.text.match(word)) {

          if (!this.index[word]) this.index[word] = [doc.id];
          else this.index[word].push(doc.id);
        }
      }
    });
  };

  #getDocsByIndexWords = (indexWords) => {
    const uniqueIds = new Set();
    const result = [];

    for (let i = 0; i < indexWords.length; i += 1) {
      const word = indexWords[i];
      const docIds = this.index[word] ?? [];

      for (let j = 0; j < docIds.length; j += 1) {
        uniqueIds.add(docIds[j]);
      }
    }

    uniqueIds.forEach(id => {
      result.push(this.docs[id]);
    });

    return result;
  };
}
