const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestionanswers = async ({ questionnaireID, questionID }, { format }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // If questionID does not exist, throw error
    if (!questionnaire.questions.find(x => x.qID === questionID)) throw ({ statusCode: 400, message: 'Question does not exist' })

    // Fetch answers to question
    const dbanswers = await Answer.find({ questionnaireID, qID: questionID })

    // Sort answers by creation date
    dbanswers.sort((x, y) => (x.createdAt > y.createdAt) ? 1 : -1)
    const answers = dbanswers.map(x => ({ session: x.session, ans: x.ans }))

    // If format == 'csv', return answers in csv format
    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        if (answers.length === 0) return ('"questionnaireID","questionID","session","ans"')
        return parse(answers.map(answer => ({ questionnaireID, questionID, ...answer })))
    }

    // Compose and return answers in json format
    return { questionnaireID, questionID, answers }
}

module.exports = getquestionanswers