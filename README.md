Laurea University of Applied Sciences - Deploy and Build React-Native Apps

If you want to try this app by yourself, you'll need to reprorduce two mandatory steps:

- Get your own YouTube V3 Data API key (you can follow this tutorial: https://blog.hubspot.com/website/how-to-get-youtube-api-key to get it). Once you have your key, store it in a `env.js` file based at the root of the `front` folder. Don't forget to export this variable, otherwise it won't be accessible outside the file.

- Create the MySQL database (you will have to install MySQL on your computer), the schema script can be found in the `database` folder.

- Create a `.env` file inside of the `back` folder that will contain these environment variables `DB_HOST` `DB_USER` `DB_PASSWORD` `DB_DATABASE` `DB_PORT`. These variables will be used to store the values that you set-up when you installed your database. If you have difficulties to set-up the back end, you can follow this tutorial: https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64 that explains all the step to create the same back-end.

To run the back and the front (as the app is not dockerized yet):

- Open two terminals.

- With the first terminal, go to the `front` folder, run `npm i`, and then `npx expo start`.

- Use your second terminal to go to the `back` folder, run `npm i` as well and type `node dbServer.js` to start the server.
Please feel free to send me a DM if you encounter issues while trying to run the project.
