Laurea University of Applied Sciences - Deploy and Build React-Native Apps

If you want to try this app by yourself, you'll need to reprorduce two mandatory steps:

- Get your own YouTube V3 Data API key (you can follow this tutorial: https://blog.hubspot.com/website/how-to-get-youtube-api-key to get it). Once you have your key, store it in a `env.js` file based at the root of the `front` folder. Don't forget to export this variable, else it won't be accessible outside the file.

- Create the mySQL database, the schema script can be found in the `database` folder.

To run the back and the front (as the app is not dockerized yet):

- Open two terminals, go to the `front` folder, run `npm i`, then `npx expo start`. Use your second terminal to go to the `back` folder and simply run `node dbServer.js`, note that you will need a `.env` file inside of this folder that will contain these  environment variables `DB_HOST` `DB_USER` `DB_PASSWORD` `DB_DATABASE` `DB_PORT`.

Please feel free to send me a DM if you encounter issues while trying to run the project.
