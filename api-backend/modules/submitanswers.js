const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')
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


const validateAnswers = (questionnaire, answers) => {
    const error = { statusCode: 400, message: 'Invalid data.' }
    if (!Array.isArray(answers)) throw error

    var v = questionnaire.questions.map(question => {
        const qID = question.qID
        const required = question.required
        const options = question.options.map(x => ({ optID: x.optID, nextqID: x.nextqID}))
        const single = (options.length === 1)
        const skip = new Set() 
        return { qID, required, single, skip, options }
    })

    v.push({qID : '-', skip: new Set()})
    
    for (var i = v.length - 2; i >= 0; i--) {
        if (v[i].required.toUpperCase() === 'FALSE') {
            var skip = new Set(v[i+1].skip)
            skip.add(v[i+1].qID)
            v[i].skip = skip
        }
        for (var option of v[i].options) {
            nextqID = new Set(v.find(x => x.qID === option.nextqID).skip)
            nextqID.add(option.nextqID)
            option.nextqID = nextqID
        }
    }

    if (answers.length === 0) {
        if (v[0].skip.has('-')) return
        else throw error
    }

    var acceptable = new Set(v[0].skip)
    acceptable.add(v[0].qID)
    
    for (const answer of answers) {
        if (!answer.questionID || !answer.optionID) throw error
        
        if (!acceptable.has(answer.questionID)) throw error
        var currQuestion = v.find(x => x.qID === answer.questionID)
        
        if (currQuestion.single) {
            acceptable = currQuestion.options[0].nextqID
        }
        else {
            var opt = currQuestion.options.find(x => x.optID === answer.optionID)
            if (!opt) throw error
            acceptable = opt.nextqID
        }
    }
    if (!acceptable.has('-')) throw error

    return
}


const submitanswers = async ({ questionnaireID }, answers) => {
    
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    validateAnswers(questionnaire, answers)

    const session = await generatesession(questionnaireID)

    for (const answer of answers) {
        var result = await doanswer({ questionnaireID, questionID: answer.questionID, session, optionID: answer.optionID })
    }

    return "Answers submitted successfully."
}


module.exports = submitanswers