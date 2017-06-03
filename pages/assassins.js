import React from "react";
import nouns from "../nouns.json";
import Layout from "../comps/Layout";

const shuffle = array => {
  let m = array.length;
  let i, t;
  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const matchPeopleToWords = (people, words) => {
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

const PersonInput = ({ name, email, updateName, updateEmail }) => (
  <div>
    <input placeholder="name" name="name" onChange={updateName} value={name} />
    <input
      placeholder="email"
      name="email"
      onChange={updateEmail}
      value={email}
    />
  </div>
);

const Targets = ({ targets }) => (
  <div>
    {targets.map(pair => (
      <div key={pair.assassin.name}>
        <span>
          {pair.assassin.name} to kill {pair.target.name} with "{pair.killWord}"
        </span>
      </div>
    ))}
  </div>
);

export default class Page extends React.Component {
  blankPerson = () => ({ name: "", email: "" });

  constructor() {
    super();
    this.state = {
      people: [],
      generated: null,
    };
  }

  updatePerson = (index, updated) => {
    console.log("update person", index);
    let people = [
      ...this.state.people.slice(0, index),
      updated,
      ...this.state.people.slice(index + 1, this.state.people.length),
    ];
    this.setState({ people });
  };

  updateName = (index, name) => {
    this.updatePerson(index, { ...this.state.people[index], name });
  };

  updateEmail = (index, email) => {
    this.updatePerson(index, { ...this.state.people[index], email });
  };

  render() {
    return (
      <Layout>
        {this.state.people.map((person, index) => (
          <PersonInput
            key={index}
            name={person.name}
            email={person.email}
            updateName={e => this.updateName(index, e.target.value)}
            updateEmail={e => this.updateEmail(index, e.target.value)}
          />
        ))}
        <button
          onClick={() =>
            this.setState({
              people: this.state.people.concat([this.blankPerson()]),
            })}
        >
          +
        </button>
        <button
          onClick={() => {
            let generated = matchPeopleToWords(this.state.people, nouns.data);
            console.log("targets", generated);
            this.setState({ generated });
          }}
        >
          Generate Targets!
        </button>
        {this.state.generated && <Targets targets={this.state.generated} />}
      </Layout>
    );
  }
}
