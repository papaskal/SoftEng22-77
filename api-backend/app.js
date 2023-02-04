const express = require('express')
const fs = require("fs")
const https = require("https")
const mongoose = require('mongoose')
const multer = require('multer')

const Questionnaire = require('./models/questionnaire')
const Answer = require('./models/answer')
const healthcheck = require("./modules/healthcheck")
const questionnaire_upd = require('./modules/questionnaire_upd')
const resetall = require('./modules/resetall')
const resetq = require("./modules/resetq")
const getquestionnaire = require("./modules/getquestionnaire")
const getquestion = require("./modules/getquestion")
const doanswer = require("./modules/doanswer")
const getsessionanswers = require("./modules/getsessionanswers")
const getquestionanswers = require("./modules/getquestionanswers")
const getallquestionnaires = require("./modules/getallquestionnaires")
const getallsessions = require("./modules/getallsessions")
const submitanswers = require("./modules/submitanswers")
const deletequestionnaire = require('./modules/deletequestionnaire')


// Wrapper to catch and forward errors
const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}


// DBMS initialization
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/intelliq', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.error('Database failed to connect'))

const db = mongoose.connection
// Handle database connection errors
// db.on('error', (err) => { throw (err) })
db.on('error', (err) => { console.error(err) })

db.on('disconnected', () => {
    console.log('Database disconnected')
})
db.on("open", () => {
    console.log("Database connected")
})


// Express initialization
const app = express()
const upload = multer()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// https server initialization
https.createServer(
    {
        key: fs.readFileSync("./ssl/server.key"),
        cert: fs.readFileSync("./ssl/server.cert"),
    },
    app
).listen(9103, () => {
    console.log('Serving on port 9103')
})


// Middleware to display incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})


// Allow cross-origin resource sharing (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
})


// Confirm db connectivity
app.get('/intelliq_api/admin/healthcheck', catchAsync(async (req, res) => {
    const result = await healthcheck(db)
    res.send(result)
}))


// Add a new questionnaire to db
app.post('/intelliq_api/admin/questionnaire_upd', upload.single('file'), catchAsync(async (req, res) => {
    if (!req.file) throw ({ statusCode: 400, message: 'No file sent' })
    const result = await questionnaire_upd(req.file.buffer)
    res.sendStatus(result)
}))


// Reset database, ie delete all questionnaires and answers from the database
app.post('/intelliq_api/admin/resetall', catchAsync(async (req, res) => {
    const result = await resetall()
    res.send(result)
}))


// Delete all answers to a questionnaire from the database
app.post('/intelliq_api/admin/resetq/:questionnaireID', catchAsync(async (req, res) => {
    const result = await resetq(req.params)
    res.send(result)
}))


// Get general properties of a questionnaire
app.get('/intelliq_api/questionnaire/:questionnaireID', catchAsync(async (req, res) => {
    const result = await getquestionnaire(req.params, req.query)
    res.send(result)
}))


// Get a question 
app.get('/intelliq_api/question/:questionnaireID/:questionID', catchAsync(async (req, res) => {
    const result = await getquestion(req.params, req.query)
    res.send(result)
}))


// Add an answer to the database
app.post('/intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID', catchAsync(async (req, res) => {
    const result = await doanswer(req.params)
    res.sendStatus(result)
}))


// Get all answers of a session, sorted by qID
app.get('/intelliq_api/getsessionanswers/:questionnaireID/:session', catchAsync(async (req, res) => {
    const result = await getsessionanswers(req.params, req.query)
    res.send(result)
}))


// Get all answers for a question, for all sessions, sorted alphabetically
app.get('/intelliq_api/getquestionanswers/:questionnaireID/:questionID', catchAsync(async (req, res) => {
    const result = await getquestionanswers(req.params, req.query)
    res.send(result)
}))


// Get a list of all questionnaires (titles and IDs), sorted by creation date
app.get('/intelliq_api/allquestionnaires', catchAsync(async (req, res) => {
    const result = await getallquestionnaires()
    res.send(result)
}))


// Get all session strings for a questionnaire, sorted alphabetically
app.get('/intelliq_api/allsessions/:questionnaireID', catchAsync(async (req, res) => {
    const result = await getallsessions(req.params)
    res.send(result)
}))


// Add a full set of answers for a questionnaire
app.post('/intelliq_api/submitanswers/:questionnaireID', upload.array(), catchAsync(async (req, res) => {
    const result = await submitanswers(req.params, req.body)
    res.sendStatus(result)
}))


// Delete a questionnaire from the database
app.delete('/intelliq_api/admin/deletequestionnaire/:questionnaireID', catchAsync(async (req, res) => {
    const result = await deletequestionnaire(req.params)
    res.sendStatus(result)
}))


// This is reached iff the request does not match a valid service
app.all('*', (req, res, next) => {
    next({ message: 'Service not found', statusCode: 404 })
})


// Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.error(`ERROR: ${err.message}`)
    if (statusCode == 500) err.message = "Something went wrong"
    const result = { status: "failed", reason: err.message }
    res.status(statusCode).send(result)
})