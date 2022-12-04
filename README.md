# The MovieDB App
The MovieDB App is made for the Introduction to Mobile Application Development course at Laurea University of Applied Sciences, and is brought to you by:

- Joel Isotalo
- Igor Rautiainen
- Stephané Riveaux
- Kimberly Ruohio

## App Features
The MovieDB allows the user to browse trending movies, as well as search for films, and TV shows, with the ability to tap through for more information on each result. The information supplied depends on what’s in TMDB. The user can register, login and logout, reset the password, though sending a request for a new password is not yet implemented. The application also offers account information and an about screen for more information. 

### Under the Hood
The MovieDB app is made with React Native and NodeJS, built with Expo. It features a simple MySQL database to demonstrate user login, with hashed passwords that would secure user data in a real-world scenario. The keyboard type should also change depending on the type of text entry, and can be dismissed by tapping outside the text area throughout the application.

## Instructions
If you want to try this app by yourself, you'll need to follow these steps. The following assumes you have both Node and Expo installed already, but if you don’t, then follow the directions found at the following links:

 - <https://nodejs.org/en/download/>
 - <https://docs.expo.dev/get-started/installation/>
 - Expo Go can be found in the App Store or Google Play.
 - If running MacOS, having Homebrew or Yarn can make life easier.

### TMDB API Key
You’ll also need you’re own API key to use TMDB’s website. Without it, the app will not be able to work properly. As it’s not best practice to share keys, we ask that you go generate your own for free over at <https://www.themoviedb.org>. 

- After creating your free account, go to your account settings and request a personal or student API. 

![alt text](https://i.imgur.com/DuQ2jw7.png)


If you need a website, simply use our Github address, <https://github.com/StephaneRv/react-native-laurea>. 

- The API key should be generated automatically, and will be copied later in the instructions below.

==The instructions may look daunting, but it takes longer to read than to do!==

### MySQL server and Database
1. Create the MySQL database (you will have to install MySQL Server and MySQL Workbench on your computer), the schema script can be found in the database folder, and make sure the server is running. Note the port, you’ll need it for later.

	- Install MySQL Server: <https://dev.mysql.com/downloads/installer/>
	- Install MySQL Workbench: <https://dev.mysql.com/downloads/workbench/>

2. Once your MySQL server is running, open MySQL Workbench, and run the schema found in the /database folder. This will create our userDB. You can close Workbench now if you wish, but it’s recommended to setup your userDB username and password here. (See the note at the end of this section for a tutorial that can help with that.)

3. Create a `.env` file in the /back folder that will contain these environment variables `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, and `DB_PORT`. These variables will be used to store the values that you set-up when you installed your database.

The `/back/.env` file should look like the following: 
	
```
DB_HOST = localhost
DB_USER = newuser
DB_PASSWORD = password1
DB_DATABASE = userDB
DB_PORT = 3306
PORT = 3000
```

4. Create a `.gitignore` in the `/back` folder, so that your personal database settings aren’t shared with the internet on Github. 

It should look like this, if creating from scratch. If it already exists, just make sure the `.env` is there:
	
```
# Env
	.env
```

#### Note! 
- If you have difficulties setting-up the back end, you can follow this tutorial: <https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64> that explains all the steps to create the same back-end. There’s no need to read the entire page, just the part up to running the database, but it does have some troubleshooting tips if needed.

### Setting up the Frontend
1. In order for the app to run, there’s data unique to you that it needs:

	- Expo Go, the application on your mobile device that will run the app, needs to be able to find your computer on the network. If you’re using an internal (NAT) IP, then open your router’s settings page and find your computer. If you have an external IP, then simply open Google and ask “What is my IP?”

	- The API key you generated over TMDB, to get data from their website.

2. Create a new file in the `/front` folder called `env.js`. This is where the app looks for your IP address for Expo to work, and TMDB’s API for that to work.

The `env.js` file should look like this:

```
const BACKEND_URL = "http://your.numeric.address:3000";

const TMDB_API_KEY = "your_api_key";

export default {BACKEND_URL, TMDB_API_KEY};
```

2. Add it to your `.gitignore` file (create that file in the root folder if it doesn’t already exist). This is so you don’t potentially share your own key and personal IP with the rest of the internet.

It should look like this, if creating from scratch. If it already exists, just make sure the `env.js` is there:
	
```
#env
	env.js
```

#### Note!
The port you’re using for the backend server might be different. The default is generally port 3000. Adjust the `back/.env` accordingly, more on that below.

## Running the App
To run the back and the front for a fully-functioning app (as the app is not dockerized yet):

1. Open two terminals.

2. With the first terminal, go to the front folder, run `npm i`, and then `npx expo start`.

3. Use your second terminal to go to the back folder, run `npm i` as well and type `node dbServer.js`  or `nodemon dbServer` to start the server. Note the port the server’s running on, if it’s something other than 3000, adjust the addresses while setting up the Frontend, and the .env setup in the Backend accordingly. 

4. Scan the QR code in the terminal with your mobile device to launch Expo Go. The application will build itself and launch. (Alternatively you should be able to launch Expo Go, and find the application ready and waiting for launch. You may have to create a free account.) It takes a few seconds to build the app.

5. When you’re done with the application, you can stop the terminal processes with a ctrl-c in each terminal window. Remember to stop the MySQL Server when you’re not using it.

5. Please feel free to send us a DM if you encounter issues while trying to run the project.
