const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getsessionanswers = async ({ questionnaireID, session }, { format }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    // If session does not exist, throw error
    const dbanswers = await Answer.find({ questionnaireID, session })
    if (dbanswers.length === 0) throw ({statusCode: 400, message: 'Session does not exist.'})

    // Sort answers by qID
    const answers = dbanswers.map(x => ({ qID: x.qID, ans: x.ans }))
    answers.sort((x, y) => (x.qID > y.qID) ? 1 : -1)

    // If format == 'csv', return answers in csv format
    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(answers.map(answer => ({ questionnaireID, session, ...answer })))
    }

    // Compose and return answers in json format
    return { questionnaireID, session, answers }
}

module.exports = getsessionanswers