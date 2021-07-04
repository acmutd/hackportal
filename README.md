## HackPortal

_A platform for user-friendly hackathon event management._

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Set up

First, make sure you have a working installation of Node.js and NPM.

Now clone the repository and install dependencies:

```
git clone https://github.com/acmutd/hackportal
cd hackportal
npm install
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

This project uses a few tools to enforce code quality:

- [Prettier](https://prettier.io), an opinionated code formatter
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), a
  format for consistent commit messages
- [Commitizen](https://github.com/commitizen/cz-cli), a tool for easily making
  formatted commits.

The repository already has these set up. Contributors only need to run
`git commit`, and Commitizen will take care of the rest with a setup flow.

## Making Changes

### General Contributor Guidlines

The custom Git hooks for the repository will reject your commits if they aren't
formatted properly. This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
spec. Please read it before making your commits. Commits for this project take
the form of:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The easiest way to make commits is simply to use `git commit` from the command
line. Commitizen will give you a prompt asking you for information to make your
commit. An example of a properly formatted commit message:

```
feat(events): Allow user to favorite an event

A user can now favorite events to add them to their personal schedule. Favorited
events appear in a user's profile.
```

Non-trivial feature additions require explanation. Think of writing commit
messages like writing little stories to other contributors about what you've
done. The effort you put into writing a good commit message now will help later
when you need to track down a bug or when someone else is understanding why a
change was made.

Please read [this](https://chris.beams.io/posts/git-commit/) to understand
how to write a good commit message.

You can use your IDE to make commits, but commitlint will reject
improperly-formatted commit messages. As long as they're formatted properly,
you can use your IDE (but `git commit` on the command line is probably easier).
