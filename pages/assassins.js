import React from "react";
import Layout from "../comps/Layout";
import matchTargets from "../assassins/assassinMatcher";
import fetch from "isomorphic-unfetch";

const PersonInput = ({
  name,
  email,
  updateName,
  updateEmail,
  removePerson
}) => (
    <div>
      <input placeholder="name" name="name" onChange={updateName} value={name} />
      <input
        placeholder="email"
        name="email"
        onChange={updateEmail}
        value={email}
      />
      <button onClick={removePerson}>Remove</button>
      <style jsx>
        {`
        input, button {
          padding: 3px;
          font-size: 1.1rem;
          background: none;
        }

        div {
          margin: auto;
        }
        `}
      </style>
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

const Info = () => (
  <div>
    <h2>Word Assassins</h2>
    <p>Welcome to word assassins! Here's how to use this app:</p>
    <ol>
      <li>Find some friends and convince them to play</li>
      <li>Add names and email addresses below</li>
      <li>The app will generate a single 'loop' of players</li>
      <li>
        Click to send emails to the players with their targets and kill words
      </li>
      <li>Go!</li>
    </ol>
    <p>You can click 'Generate Test Set' to see sample assignments given the names you've entered.</p>
    <p>When I've played in the past, we've given prizes for the last remaining player <strong>and</strong> the player with the most kills.</p>

    <h3>Rules:</h3>
    <p>
      Each player will be emailed a target and a 'kill word'. Their goal is to
      get the target person to say the 'kill word'.
    </p>
    <p>
      If their target says the word, the assassin gets the victim's target and
      word. The game continues until there is only one assassin remaining.
      They'll know because they'll get themselves as the target from their final
      victim.
    </p>
    <p>
      For instance, if my target was Buzz Lightyear and word was 'loaf', I might
      ask Buzz to help list denominations of groceries.{" "}
      <i>"Bunch of carrots, stick of butter, jug of milk, ..."</i> When Buzz
      jumps in with <i>"loaf of bread"</i>, I get to inform him that 'loaf' was
      his word. He turns over his target and word (perhaps Woody and 'doodle').
    </p>
    <strong>Notes and tips:</strong>
    <ul>
      <li>
        Don't let your target know your word (or that you are hunting them!)
      </li>
      <li>
        Don't reveal whether you have been killed! Information about who is left
        is vital.
      </li>
      <li>
        The game can go for as long as you like, but a few weeks to a month is a
        good baseline
      </li>
    </ul>
  </div>
);

class Widget extends React.Component {
  blankPerson = () => ({ name: "", email: "" });

  constructor() {
    super();
    this.state = {
      people: [],
      generated: null,
      response: null
    };
  }

  updatePerson = (index, updated) => {
    let people = [
      ...this.state.people.slice(0, index),
      updated,
      ...this.state.people.slice(index + 1, this.state.people.length)
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
        ...this.state.people.slice(index + 1, this.state.people.length)
      ]
    });
  };

  render() {
    return (
      <div className="wrapper">
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
              people: this.state.people.concat([this.blankPerson()])
            })
          }
        >
          Add A Player
        </button>
        {this.state.people.length > 1 ? (
          <React.Fragment>
            <button
              onClick={() => {
                let generated = matchTargets(this.state.people);
                this.setState({ generated });
              }}
            >
              Generate Test Set
            </button>
            <button
              onClick={() => {
                fetch("/assassins", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ people: this.state.people })
                })
                  .then(response => response.json())
                  .then(response => {
                    console.log(response);
                    this.setState({ response });
                  });
              }}
            >
              Send Secret Emails
            </button>
          </React.Fragment>
        ) : null}
        {this.state.generated && <Targets targets={this.state.generated} />}
        {this.state.response && (
          <div>{JSON.stringify(this.state.response)}</div>
        )}
        <style jsx>{`
          button {
            padding: 5px;
            margin: 5px;
            background: none;
            font-size: 1.25rem;
            cursor: pointer;
          }

          .wrapper {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    );
  }
}

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Info />
        <Widget />
      </Layout>
    );
  }
}
