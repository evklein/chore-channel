# Chore Channel

Chore Channel is a web application which helps us track chores in our house. The application works on all devices, including mobile.

The application also runs continuously on an old Samsung Galaxy tablet that I have mounted to the wall in the main bathroom of our house.
![image](https://user-images.githubusercontent.com/5017975/190917408-63a0921e-d7a4-4438-b9ff-40064ef7185d.png)

### Technologies Used
* React
* Typescript
* Material Design ([MUI Library for React](https://mui.com/))
* Firebase for Deployment / Hosting

### Set-Up
The `.gitignore` for this repos specifies two files that are not included in this repo: `.firebaserc` and `firebase-config.json`.

##### Firebase Init
To set up `.firebaserc` you'll need to install the [Firebase CLI](https://firebase.google.com/docs/cli) and follow the instructions to initialize hosting for the project.

You can follow [this article](https://hackernoon.com/how-to-deploy-a-react-application-with-firebase-hosting-p92m37b7), which is what I used to set up a Firebase hosting set-up for a React app.

##### Firebase Config
To set up Firebase configurations for the project, create a new file in the `src/` directory called `firebase-config.json`. You can find your configuraiton in your Firebase dashboard, after you've set up your project. The contents of the file should look something like this:
```
{
    "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "authDomain": "XXXXXXXXXXXXXXXXXXX.firebaseapp.com",
    "projectId": "XXXXXXXXXXXXXXXXXXX",
    "storageBucket": "XXXXXXXXXXXXXXXXXXX.appspot.com",
    "messagingSenderId": "XXXXXXXXXXXX",
    "appId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Deploying
To deploy, run the following commands from the root of the project:
```
npm run build
firebase deploy
```

### Firestore Collections Schema
To add items to the page, create a collection named "chores", and have collection items follow the below schema:

- `id` (make this the same as the `name` field)
  - `name` [String]: The name of the chore
  - `period` [Number]: The number of days between how often this chore needs to be performed (daily = 1, weekly = 7, etc.)
  - `last_completed` [Timestamp]: The last completed date of the chore
