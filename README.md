# Jot - A New Note Taker
### Tech Stack
React and Google Firebase. Simply `yarn` and `yarn start` the client application. Deployed version is at https://jot-cs52.surge.sh/.
## Features
### Google Authenatication
The app uses Firebase's Google Authentication API to allow users to login with their Google accounts.

The database stores notes based on user profiles, so only you can access your notes.

### Dynamic Z-Index
The app has a function that makes the current note (that is being dragged or edited) have the highest z-index so that it overlays all others.

### Material-UI
The app incorporates Google Material-UI kit https://material-ui.com/ for styling purposes only. All critical functionality is custom-built.

I referenced code from the kit API found here https://material-ui.com/api/app-bar/

### Timestamp
Each note you make in the app has a timestamp that shows the most recent edited time. This feature is not 100% complete, however.
