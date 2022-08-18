export default class Relevance {
  metric = {};

  actualizeRelevance = (docs) => {
    docs.forEach(doc => {
      if (!this.metric[doc.id]) this.metric[doc.id] = 1;
      else this.metric[doc.id] += 1;
    });
  };

  sortByRelevance = (docs) => docs.sort((a, b) => {
    const aRelevance = this.metric[a.id] ?? 0;
    const bRelevance = this.metric[b.id] ?? 0;
    if (aRelevance > bRelevance) return -1;
    if (bRelevance < aRelevance) return 1;
    return 0;
  });
}
