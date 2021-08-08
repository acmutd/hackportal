# Setting up Firebase

HackPortal has a modular design that allows swapping out back-end services wtih
minimal friction. By default, this project uses Firebase APIs. If you use any of
the following, you must set up Firebase APIs before running this app:

- Firebase Authentication
- Cloud Firestore
- Google Cloud Storage for Firebase

To set up Firebase APIs, first go to the [Firebase Console](https://console.firebase.google.com).
Make sure to switch to your intended account before continuing.

Now create a Firebase project or use an existing Firebase project. (Project
maintainers should use an existing project and see the section below.).

- If creating a new project, create a new web application and take note of the
  configuration code provided. Copy that somewhere.
- If using an existing project, navigate to project settings and find the app's
  Firebase configuration.

![Firebase Settings](./images/set-up-1.png)

![App configuration](./images/set-up-2.png)

Now go back to the HackPortal project files. Rename the `.env.template` file to
`.env.local`. This is where you will set up the app's environment variables.

The file should look like this:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Fill in the environment variables using the appropriate images from the Firebase
Console. After doing that, you should be able to start the app with no errors!

## Notes for HackUTD Maintainers

Make sure you are using the `acmutd-hackportal-dev` project. If you do not have
permissions to access this project, let a maintainer know.

When deploying, the head maintainer will use other environment variables for the
production version of the project.
