function getSearchStringWords(str) {
  const filteredString = str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, " ");
  return filteredString.split(' ');
}

export default class SearchEngine {
  docs = [];

  #relevance;

  constructor(docs, relevance) {
    this.docs = docs;
    this.#relevance = relevance;
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

    const result = [];

    for (let i = 0; i < this.docs.length; i += 1) {
      const doc = this.docs[i];

      let isAppropriate = false;

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];

        if (doc.text.match(word)) {

          if (!isAppropriate) isAppropriate = true;

          const goalsCount = goals[doc.id];

          if (!goalsCount) goals[doc.id] = 1;
          else goals[doc.id] += 1;
        }
      }

      if (isAppropriate) result.push(doc);
    }

    this.#relevance.actualizeRelevance(result);

    return this.#sortResult(result, goals);
  };
}
