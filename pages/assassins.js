import React from "react";
import Layout from "../comps/Layout";
import matchTargets from "../assassinMatcher";
import fetch from "isomorphic-unfetch";

const PersonInput = ({
  name,
  email,
  updateName,
  updateEmail,
  removePerson,
}) => (
  <div>
    <input placeholder="name" name="name" onChange={updateName} value={name} />
    <input
      placeholder="email"
      name="email"
      onChange={updateEmail}
      value={email}
    />
    <button onClick={removePerson}>x</button>
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
      response: null,
    };
  }

  updatePerson = (index, updated) => {
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

  removePerson = index => {
    this.setState({
      people: [
        ...this.state.people.slice(0, index),
        ...this.state.people.slice(index + 1, this.state.people.length),
      ],
    });
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
            removePerson={e => this.removePerson(index)}
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
            let generated = matchTargets(this.state.people);
            this.setState({ generated });
          }}
        >
          Generate A Test Set!
        </button>
        <button
          onClick={() => {
            fetch("/assassins", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ people: this.state.people }),
            }).then(response => this.setState({ response }));
          }}
        >
          Send secret emails to assassins with their targets!
        </button>
        {this.state.generated && <Targets targets={this.state.generated} />}
        {this.state.response &&
          <div>{JSON.stringify(this.state.response)}</div>}
      </Layout>
    );
  }
}
