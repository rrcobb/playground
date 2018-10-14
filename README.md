# playground
Just a space for little js experiments

Ignore most of the things here.

## If you want to run word assassins:

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

## TODO
I tried to get hosting working through [now](https://zeit.co/now), but my builds kept failing, I didn't have a good way to see decent log output, and I got bored of debugging. It's most likely an issue with the dependencies installing wrong, my yarn.lock is from a mac and it might be confusing to the (I assume) dockerized linux box that the good folks at zeit are running it on.

If you fix it, sweet.
