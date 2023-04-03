# Redditech
A Reddit clone social mobile app made with React Native

# ![ScreenShot](images/logo-reddit1.png) Redditech - Reddit Clone - React Native  




- for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

Connection to [Reddit API](https://www.reddit.com/dev/api/) with [Oauth2]( https://github.com/reddit-archive/reddit/wiki/OAuth2) and use routes from the API 

## Create a connection to the API Reddit and implement a redirection :
* Create a [Reddit account](https://www.reddit.com/) 
####
* Go to the [Prefs/app](https://www.reddit.com/prefs/apps) of the API Reddit :

![ScreenShot](images/DevAppReddit.png)

## Create Redditech app :

    expo init Redditech
    cd Redditech

## Run the Redditech app on your mobile :

    expo start or expo start --tunnel
    
## Run the Redditech app on your computer :

    expo start --web

## Install dependencies :

    npm install react-native-paper
    npm install react-native-vector-icons
    npm install react-avatar --save
    npm install @react-native-material/core
    npm i oauth
    npm i AsyncStorage
    npm i react-navigation
    npm i expo-auth-session
    npm i expo-asset
    npm i expo-av
    npm i expo-constants
    npm i expo-font
    npm i expo-linking
    npm i expo-module-scripts
    npm i expo-random
    npm expo-splash-screen
    npm expo-status-bar
    npm expo-system-ui
    npm expo-web-browser

## Unit tests :

    expo install jest-expo jest
    npm i --save-dev @types/jest
    
## Tree app Redditech – first to second level :

 ![ScreenShot](images/TreeRed.png) 
    
# Redditech : THE APP 

### Connect the API Reddit :

* Home of Redditech with login button :

![ScreenShot](images/Accueil.png)

### On click => Use your own reddit account to connect the API

![ScreenShot](images/Connection-reddit-api.png) 

* With the access_token you can have a personnal experience with your own Subreddits and posts :

![ScreenShot](images/Subreddits.png)
![ScreenShot](images/Posts.png)

* You can access to your profile :

![ScreenShot](images/Profile.png)

* You can search for subreddits :

![ScreenShot](images/Search.png)

* And filtered posts :

![ScreenShot](images/BestPosts.png)
![ScreenShot](images/Filter.png)

   
   

