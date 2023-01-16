const express = require('express')
const fs = require("fs")
const https = require("https")
const mongoose = require('mongoose')
const multer = require('multer')

const Questionnaire = require('./models/questionnaire')
const Answerraire = require('./models/answerraire')
const Answer = require('./models/answer')
const healthcheck = require("./healthcheck")
const questionnaire_upd = require('./questionnaire_upd')
const resetall = require('./resetall')
const resetq = require("./resetq")
const getquestionnaire = require("./getquestionnaire")
const getquestion = require("./getquestion")
const doanswer = require("./doanswer")
const getsessionanswers = require("./getsessionanswers")
const getquestionanswers = require("./getquestionanswers")
const getallquestionnaires = require("./getallquestionnaires")
const getallsessions = require("./getallsessions")
const submitanswers = require("./submitanswers")

const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}

mongoose.set('strictQuery', true)
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
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(upload.array())
// app.use(upload.single('file'))
// app.use(upload.none())


https.createServer(
    {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.cert"),
    },
    app
).listen(9103, () => {
    console.log('Serving on port 9103')
})


app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'OPTIONS, DELETE, POST, GET, PATCH, PUT')
    next()
})

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  })

app.get('/intelliq_api/admin/healthcheck', (req, res) => {
    res.send(healthcheck(db))
})


app.post('/intelliq_api/admin/questionnaire_upd', upload.single('file'), catchAsync(async (req, res) => {
    const result = await questionnaire_upd(req.file.buffer)
    res.sendStatus(result)
}))


app.post('/intelliq_api/admin/resetall', catchAsync(async (req, res) => {
    const result = await resetall()
    res.sendStatus(result)
}))


app.post('/intelliq_api/admin/resetq/:questionnaireID', catchAsync(async (req, res) => {
    const result = await resetq(req.params)
    res.sendStatus(result)
}))


app.get('/intelliq_api/questionnaire/:questionnaireID', catchAsync(async (req, res) => {
    const result = await getquestionnaire(req.params)
    res.send(result)
}))


app.get('/intelliq_api/question/:questionnaireID/:questionID', catchAsync(async (req, res) => {
    const result = await getquestion(req.params)
    res.send(result)
}))


app.post('/intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID', catchAsync(async (req, res) => {
    const result = await doanswer(req.params)
    res.sendStatus(result)
}))


app.get('/intelliq_api/getsessionanswers/:questionnaireID/:session', catchAsync(async (req, res) => {
    const result = await getsessionanswers(req.params)
    res.send(result)
}))


app.get('/intelliq_api/getquestionanswers/:questionnaireID/:questionID', catchAsync(async (req, res) => {
    const result = await getquestionanswers(req.params)
    res.send(result)
}))


app.get('/intelliq_api/allquestionnaires', catchAsync(async (req, res) => {
    const result = await getallquestionnaires()
    res.send(result)
}))


app.get('/intelliq_api/allsessions/:questionnaireID', catchAsync(async (req, res) => {
    const result = await getallsessions(req.params)
    res.send(result)
}))


app.post('/intelliq_api/submitanswers/:questionnaireID', upload.array(), catchAsync(async (req, res) => {
    console.log(req.body)
    const result = await submitanswers(req.params, req.body)
    res.sendStatus(result)
}))


app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err
    if (!err.message) err.message = "Oh no, something went Wrong!"
    console.log(err.message)
    res.status(statusCode).send('error', { err })
})