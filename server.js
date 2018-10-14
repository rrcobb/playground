const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const configureGmail = require('gmail-send');
const matchTargets = require('./assassinMatcher');

const dev = process.env.NODE_ENV === 'development';
const app = next({dev});
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const gmailSend = configureGmail({
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASSWORD,
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rules =
  'The rules are simple. Get your target to say the target word, in your hearing. After you do, secretly let them know that they are out (for instance, forward them this email). If you are killed, give your killer your target and word. \n\nTwo prizes will be awarded: one for the last person alive, and one for the person who eliminates the most foes. Good luck!';

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = {title: req.params.id};
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/c/:id', (req, res) => {
      const actualPage = '/course';
      const queryParams = {course_id: req.params.id};
      app.render(req, res, actualPage, queryParams);
    });

    server.use('/assassins', bodyParser.json());
    server.post('/assassins', (req, res) => {
      const {people} = req.body;
      if (
        people &&
        people.length &&
        people.every(
          person =>
            person.name && person.email && person.email.match(emailRegex)
        )
      ) {
        const playerNames = `${people.map(p => p.name).join('\n')}`;
        const now = Date();
        const gameInfo = `Start: ${now.toString()}\nPlayers:\n${playerNames}`;
        const targets = matchTargets(people);
        targets.forEach(target => {
          let to = target.assassin.email;
          let subject = '[TOP SECRET] Word Assassin Target';
          let targetInfo = `Your target is ${target.target.name}. To knock them out, get them to say "${target.killWord}"`;
          let text = `${targetInfo}\n\n${rules}\n\n${gameInfo}\n\n`;
          gmailSend(
            {
              to,
              subject,
              text,
            },
            (err, res) => console.log('gmail send', 'err:', err, 'res:', res)
          );
        });
        res.send({ok: true});
      } else {
        res.send({error: 'Everyone needs a name and a valid email'});
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
