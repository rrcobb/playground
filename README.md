# Playground

A space for little js experiments

Ignore most of the things here.

## What's here

- Playing with nextjs pages to see how they work
- A dumb page that lists a bunch of umd courses
- A dumb email-sender for the word assassins game

The only thing you might actually want to do is play word assassins. It's a great game, and this app makes running it just slightly easier. It lets you:

- add names and email addresses
- generates a single loop of players
- and send emails to them with their targets and kill words

You still need to find friends, convince them to play, and enforce the rules.

## If you want to run the word assassins code yourself

1. Get things running:
```
(clone)
$ yarn install
$ yarn dev
```
2. Use the tool
```
open localhost:3000/
hit the + button to add names / emails
hit 'generate test set' to match people with targets / words
hit 'send secret emails' to send secret emails
```
3. In order to actually send emails:

Set `GMAIL_USER` and `GMAIL_PASSWORD` env variables.

You'll need to click a button in your google security settings to allow this kind of access. This is not a particularly good idea, so you should probably create a special-purpose account for this, instead of using your real account.

> Note: if you actually deploy it, someone else could use the tool to kick off a game of their own. What a thought.
>       of course, it'd need to be deployed with the env variables set...

> Second Note: Google locks down its security pretty good for gmail these days. Just an email and password won't be enough! Thankfully, trying to send emails with the username / password credentials triggers a helpful security alert, and a few clicks away is the settings page where you can 'Turn on insecure apps'. Again, use a throwaway account.