const words = require("./nouns.json").data;
const shuffle = array => {
  let m = array.length;
  let i, t;
  let copy = array.slice();
  while (m) {
    i = Math.floor(Math.random() * m--);

    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
  }

  return copy;
};

module.exports = people => {
  const list = shuffle(people);
  const possibleWords = shuffle(words);
  const killWords = possibleWords.slice(0, list.length);
  let assignments = [];
  list.forEach((person, idx) => {
    let target = list[idx + 1] || list[0]; // last gets first
    let killWord = killWords[idx];
    assignments.push({ assassin: person, target, killWord });
  });
  return assignments;
};
