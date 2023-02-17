
# General Contributor Guidlines

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