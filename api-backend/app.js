const express = require('express')
const fs = require("fs")
const https = require("https")
const mongoose = require('mongoose')

const healthcheck = require("./healthcheck")


mongoose.connect('mongodb://localhost:27017/intelliq', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})


const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const app = express()

app.use(express.urlencoded({ extended: true }))


https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  ).listen(9103, () => {
    console.log('Serving on port 9103')
})


app.get('/', (req, res) => {
    res.send('home')
})


app.get('/admin/healthcheck', (req, res) => {
    res.send(healthcheck(db))
})