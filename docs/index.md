# Overview

Before extending and configuring this project, please set up the project using
the instructions in the [Getting Set Up](./set-up.md) docs.

# Configuration

You can use your own backend with HackPortal. It currently uses:

- Cloud Firestore as a NoSQL database
- Firebase Auth (server-side) for authentication
- Cloud Storage for Firebase for user-generated blob content

The middleware is where you can swap out the database or storage solution. The
middleware interface to HackPortal can be found in the /pages/api directory. It
is a REST-based internal API service used for fetching data on the client.
