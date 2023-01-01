const mongoose = require('mongoose')
const Answer = require('./models/answer')
const getallsessions = require('./getallsessions')
const doanswer = require('./doanswer')


const generaterandomstring = (length) => {
    var result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}


const generatesession = async (questionnaireID) => {
    const sessions = await getallsessions({ questionnaireID })
    do {
        var result = generaterandomstring(4)
    } while (sessions.includes(result))

    return result
}


const submitanswers = async ({ questionnaireID }, { file }) => {
    const answers = JSON.parse(file)
    const session = await generatesession(questionnaireID)
    for (const q in answers) {
        var result = await doanswer({ questionnaireID, questionID: q, session, optionID: answers[q] })
    }

    return result
}

module.exports = submitanswers