const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require('../models/answer')


const doanswer = async ({ questionnaireID, questionID, session, optionID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    const question = questionnaire.questions.find(x => x.qID === questionID)
    if (!question) throw ({ statusCode: 400, message: 'Question does not exist.' })
    
    if (question.options.length > 1 && !question.options.find(x => x.optID === optionID)) throw ({ statusCode: 400, message: 'Option does not exist.' })

    const existingAnswer = await Answer.findOne({ questionnaireID, qID: questionID, session })
    if (existingAnswer) throw ( { statusCode: 400, message: 'Question has already been answered in this session.' })

    const answer = new Answer({ questionnaireID, qID: questionID, session, ans: optionID })
    await answer.save()
    return "Answer submitted successfully."
}

module.exports = doanswer
