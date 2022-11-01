# Firebase Setup

Make sure your local server is up and running before configuring Firebase. If it is not, please follow the instructions given in the [Set Up Guide](./set-up.md).

## Database Schema  
As information is added to the database, the updates will show on the local server.     

Example Layout
- collection
    - document
        - field 1 [type]
        - field 2 [type]

Challenges
- challenges
    - [document]
        - title [string]
        - description [string]
        - organization [string]
        - prizes [array of strings]
        - rank [number]

FAQs
- faqs
    - [document]
        - question [string]
        - answer [string]

Keynote Speakers
- keynotespeakers
    - [document]
        - name [string]
        - description [string]
        - fileName [string]

Team Members
- members
    - [document]
        - name [string]
        - description [string]
        - github [string]
        - linkedin [string]
        - personalSite [string]
        - fileName [string]
        - rank [number]

Event Schedule
- schedule-events
    - [document]
        - title [string]
        - description [string]
        - location [string]
        - page [string]
        - startDate [timestamp]
        - endDate [timestamp]
        - Event [number]

Sponsor Logos
- sponsors
    - [document]
        - link [string]
        - reference [string]

Other:
Announcements, Registrations, and Scan Types will update as added by an Admin.
Tokens will update as people accept push notifications from the site.   


## Important Info
All collections and fields are to be copied exactly as they are found in these docs.  
All web links must begin with "https://"  
All image references must have their file type (.jpg, .png, etc.)  
Note that there is only one collection, and each collection can contain multiple documents that contain the fields described.  
Documents can (and should) be Auto-ID'd.

## Storage Setup

Create the following folders in Firebase Storage:  
`member_images/`  
`speaker_images/`  
`sponsor_images/`  
These folders will contain images of the team members, the keynote speakers, and the sponsor logos respectively. Upload the images to the folders and reference them in the database.  
For example, if there was a "default.png" in the `speaker_images/` folder, then the "fileName" field of the "members" collection needs to contain the string "default.png".

## Authentication Setup
Navigate to the "Authentication" tab. Under "Sign-in method", ensure that Email/Password and Google are valid Sign-in providers. 

Below that, add any domains that need to be authorized to enable Google and email sign-in. 

**IMPORTANT Production Release Note**: At the end of the "Sign-in method" page, increase the sign-up quota to ensure sign-ins are not being prevented during registration and check-in.

Optional: Under "Templates" customize the emails that are sent out when verifying email addresses or resetting passwords.

## Admin Setup
To set up your superadmin account, start the development server and use the sign-in button to create an account. Once the account has been created, navigate to the Firestore Database in Firebase and go to the "/registrations" collection. Find the document with your sign-in and under the "permissions" array in the "user" map, update the "hacker" role to "super_admin". You should now have full access to the Admin panel.
