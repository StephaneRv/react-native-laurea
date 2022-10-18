const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
var cors = require('cors')

app.use(cors())
app.use(express.json())

require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

db.getConnection( (err, connection)=> {
    if (err) {
        throw (err)
    }
   console.log ("DB connected successful: " + connection.threadId)
})

const port = process.env.PORT
app.listen(port,
    ()=> console.log(`Server Started on port ${port}...`))

app.post("/register", async (req,res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection(async (err, connection) => {
        if (err)
            throw (err)
        const sqlSearch = "SELECT * FROM userTable WHERE username = ?"
        const search_query = mysql.format(sqlSearch,[username])
        const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert,[username, hashedPassword])

        await connection.query(search_query, async (err, result) => {
            if (err)
                throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err)
                        throw (err)
                    console.log ("------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        })
    })
})

// const generateAccessToken = require("./generateAccessToken")

app.post("/login", (req, res)=> {
    const username = req.body.username
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
        if (err)
            throw (err)
        const sqlSearch = "Select * from userTable where username = ?"
        const search_query = mysql.format(sqlSearch,[username])
        await connection.query (search_query, async (err, result) => {
                connection.release()

            if (err)
                throw (err)
            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.sendStatus(404)
            }
            else {
                const hashedPassword = result[0].password
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    // console.log("---------> Generating Access Token")
                    // const accessToken = generateAccessToken({user: username})
                    res.send(`${username} is logged in`)
                }
                else {
                    console.log("---------> Password Incorrect")
                    res.send("Password incorrect")
                }
            }
        })
    })
})