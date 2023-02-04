const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')
const getallsessions = require('./getallsessions')
const doanswer = require('./doanswer')


// Auxiliary function for generatesession. Generate a random alphanumerical string of <length>
const generaterandomstring = (length) => {
    var result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}


// Generate a valid session string
const generatesession = async (questionnaireID) => {
    // Fetch all current session strings for this questionnaire
    const { sessions } = await getallsessions({ questionnaireID })

    // Generate random 4-char long alphanumerical strings, until you generate one that is NOT an existing session
    do {
        var result = generaterandomstring(4)
    } while (sessions.includes(result))

    return result
}


// Validate answer list. If invalid, throw error
const validateAnswers = (questionnaire, answers) => {
    const error = { statusCode: 400, message: 'Invalid data' }

    // If answers is null, or is not an array, throw error
    if (!Array.isArray(answers)) throw error

    // Create array v from questionnaire questions. v is an auxiliary array to help validation along the way
    var v = questionnaire.questions.map(question => {
        const qID = question.qID
        const required = question.required
        const options = question.options.map(x => ({ optID: x.optID, nextqID: x.nextqID }))

        // If single == true, the question will be answered with an <open string>
        const single = (options.length === 1)
        // 'skip' will contain all the qIDs of questions that can be reached by skipping questions in succession, starting from this one (if this one is skippable)
        const skip = new Set()
        return { qID, required, single, skip, options }
    })

    // Add a pseudo-question to the end of v, to signify the end of the questionnaire
    v.push({ qID: '-', skip: new Set() })

    // Calculate the correct values for the fields skip and nextqID
    for (var i = v.length - 2; i >= 0; i--) {
        // If this question is skippable, 'skip' will contain all the qIDs of questions that can be reached by skipping questions in succession
        if (v[i].required.toUpperCase() === 'FALSE') {
            var skip = new Set(v[i + 1].skip)
            skip.add(v[i + 1].qID)
            v[i].skip = skip
        }

        // nextqID is redefined as the set of questions that can be reached by selecting this option and then maybe skipping questions if possible
        for (var option of v[i].options) {
            nextqID = new Set(v.find(x => x.qID === option.nextqID).skip)
            nextqID.add(option.nextqID)
            option.nextqID = nextqID
        }
    }

    // If answer list is empty, it is valid only if the questionnaire can be fulfilled without answering any questions (e.g. if all the questions are skippable)
    if (answers.length === 0) {
        if (v[0].skip.has('-')) return
        else throw error
    }

    // 'acceptable' will contain all the qIDs of the questions that can be reached currently, based on the previous answer
    // In the beginning, it contains the qID of the first question, plus the qIDs of questions that can be reached by skipping questions
    var acceptable = new Set(v[0].skip)
    acceptable.add(v[0].qID)

    for (const answer of answers) {
        // If answer does not have a questionID or optionID field, throw error
        if (!answer.questionID || !answer.optionID) throw error

        // If the qID is not in the set of current acceptable qIDs, throw error
        if (!acceptable.has(answer.questionID)) throw error
        var currQuestion = v.find(x => x.qID === answer.questionID)

        if (currQuestion.single) {
            // If the question is single, it is answered with <open string>
            acceptable = currQuestion.options[0].nextqID
        }
        else {
            // If the question does not contain the given optionID, throw error
            var opt = currQuestion.options.find(x => x.optID === answer.optionID)
            if (!opt) throw error

            // 'acceptable' becomes the set of qIDs of the next question based on the original nextqID,
            // plus all the questions that can be reached by successively skipping, starting from that one 
            acceptable = opt.nextqID
        }
    }

    // If the last option answered was not 'final', throw error
    // An option is 'final' if it either points to '-' as its next question, or it can reach the end by pointing to a question and then successively skip
    if (!acceptable.has('-')) throw error

    return
}


// Add a full set of answers for a questionnaire
const submitanswers = async ({ questionnaireID }, { answers }) => {
    // If questionnaireID does not exist, throw error    
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // If data sent is not a valid list of answers to the questionnaire, throw error
    validateAnswers(questionnaire, answers)

    // Generate a random session, that does not already exist for this questionnaire
    const session = await generatesession(questionnaireID)

    // Save answers to db, using the doanswer module
    for (const answer of answers) {
        var result = await doanswer({ questionnaireID, questionID: answer.questionID, session, optionID: answer.optionID })
    }

    return 204
}


module.exports = submitanswers