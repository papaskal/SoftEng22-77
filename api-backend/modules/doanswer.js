const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require('../models/answer')


// Add an answer to the database
const doanswer = async ({ questionnaireID, questionID, session, optionID }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // If questionID does not exist, throw error
    const question = questionnaire.questions.find(x => x.qID === questionID)
    if (!question) throw ({ statusCode: 400, message: 'Question does not exist' })
    
    // If optionID does not exist, throw error
    if (question.options.length > 1 && !question.options.find(x => x.optID === optionID)) throw ({ statusCode: 400, message: 'Option does not exist' })

    // If session is not 4 characters long, throw error
    if (!session || session.length !== 4) throw ( { statusCode: 400, message: 'Session string must be 4 characters long' })

    // If question has already been answered in this session, throw error
    const existingAnswer = await Answer.findOne({ questionnaireID, qID: questionID, session })
    if (existingAnswer) throw ( { statusCode: 400, message: 'Question has already been answered in this session' })

    // If no error has been thrown, save answer to database
    const answer = new Answer({ questionnaireID, qID: questionID, session, ans: optionID })
    await answer.save()
    
    return 204
}

module.exports = doanswer
