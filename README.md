# YouTube Like App

If you want to try this app by yourself, you'll need to follow these steps. The following assumes you have both Node and Expo installed already, but if you don’t, then follow the directions found at the following links:

 - <https://nodejs.org/en/download/>
 - <https://docs.expo.dev/get-started/installation/>
 - Expo Go can be found in the App Store or Google Play.

## YouTube API Key

1. Get your own YouTube V3 Data API key (you can follow this tutorial: <https://blog.hubspot.com/website/how-to-get-youtube-api-key> to get it). Once you have your key, store it in a `env.js` file based at the root of the front folder. Don't forget to export this variable, otherwise it won't be accessible outside the file.

	The `env.js` file should look like this:

```
const YOUTUBE_API_KEY = “lotsoflettersandnumberswiththequotes”;

export default YOUTUBE_API_KEY;
```

2. Add it to your `.gitignore` file (create that file in the root folder if it doesn’t already exist). This is so you don’t share your own key with the rest of the internet.

	It should look like this, if creating from scratch. If it already exists, just make sure the `env.js` is there:
	
===
	
```
	.gitignore
			# Env
			env.js
```
	
## MySQL server and Database

1. Create the MySQL database (you will have to install MySQL Server and MySQL Workbench on your computer), the schema script can be found in the database folder, and make sure the server is running. Note the port, you’ll need it for later.

2. Once your MySQL server is running, open MySQL Workbench, and run the schema found in the /database folder. This will create our userDB. You can close Workbench now if you wish, but it’s recommended to setup your userDB username and password here.

3. Create a .env file in the /back folder that will contain these environment variables `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, and `DB_PORT`. These variables will be used to store the values that you set-up when you installed your database.

	The `/back/.env` file should look like the following: 
	
```
DB_HOST = localhost
DB_USER = newuser //Your db's username. It's recommended to create one, instead of using root.
DB_PASSWORD = password1 //Your DB's password
DB_DATABASE = userDB
DB_PORT = 3306
PORT = 3000
```

4. Create another `.gitignore` in the `/back` folder, so that your personal database settings aren’t shared with the internet on Github. 

	It should look like this, if creating from scratch. If it already exists, just make sure the `.env` is there::
	
```
	.gitignore
			# Env
			.env
```

### Note! 
- If you have difficulties setting-up the back end, you can follow this tutorial: <https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64> that explains all the steps to create the same back-end. There’s no need to read the entire page, just the part up to running the database, but it does have some troubleshooting tips if needed.

## Setting up the Frontend
- In order to run the app inside Expo Go, your mobile device needs to know how to find your computer. Open up `front/src/screens/Login.tsx`, and find the comment `//Add your computer's internal IPv4 address here`.  (If this doesn’t exist, the line number is 24.)

- This address needs to be your computer’s address. If you’re using internal IP, then open your router’s settings page and find your computer. If you have an external IP, then simply open Google and ask “What is my IP?”

- Open front/src/screens/Register.tsx, and repeat. (Line 28)

	They should now look like the following:
	
`Login.tsx`:

`axios.post("http://your.numeric.address:3000/login",` 

`Register.tsx:`

`axios.post("http://your.numeric.address:3000/register",`


### Note!
For example, as in the default code. The port you’re using for the backend server might be different. The default is generally port 3000. Adjust the `back/.env` accordingly, more on that below.

### Note for iOS users!
Depending on your version of iOS, you can have everything setup properly and the app still won’t login. If that’s the case, try adding the following to `front/app.json`  Scroll to the section that begins with “ios” and replace it with the following:

Replace everything that includes `“ios”: {},`. The comma after the brackets is important.

```
"ios": {
      "supportsTablet": true,
      "splash": {
        "image": "./assets/images/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      },
      "infoPlist": {
        "NSAppTransportSecurity" : {
          "NSAllowsArbitraryLoads" : true
        }
      }
    },
```


## Running the App

To run the back and the front for a fully-functioning app (as the app is not dockerized yet):

1. Open two terminals.

2. With the first terminal, go to the front folder, run `npm i`, and then `npx expo start`.

3. Use your second terminal to go to the back folder, run `npm i` as well and type `node dbServer.js`  or `nodemon dbServer` to start the server. Note the port the server’s running on, if it’s something other than 3000, adjust the addresses while setting up the Frontend.

4. Please feel free to send me a DM if you encounter issues while trying to run the project.