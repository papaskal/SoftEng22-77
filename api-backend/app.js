const express = require('express')
const fs = require("fs")
const https = require("https")
const mongoose = require('mongoose')
const multer = require('multer')

const Questionnaire = require('./models/questionnaire')
const Answerraire = require('./models/answerraire')
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
        key: fs.readFileSync("./ssl/server.key"),
        cert: fs.readFileSync("./ssl/server.cert"),
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
    const result = await getsessionanswers(req.params, req.query)
    res.send(result)
}))


app.get('/intelliq_api/getquestionanswers/:questionnaireID/:questionID', catchAsync(async (req, res) => {
    const result = await getquestionanswers(req.params, req.query)
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


app.delete('/intelliq_api/deletequestionnaire/:questionnaireID', catchAsync(async (req, res) => {
    const result = await deletequestionnaire(req.params)
    res.send(result)
}))


app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err
    if (!err.message) err.message = "Oh no, something went Wrong!"
    console.error(err.message)
    res.status(statusCode).send(err.message)
})