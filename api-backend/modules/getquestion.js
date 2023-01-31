const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestion = async ({ questionnaireID, questionID }, { format }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // If questionID does not exist, throw error
    const question = questionnaire.questions.filter(x => x.qID === questionID)[0]
    if (!question) throw ({ statusCode: 400, message: 'Question does not exist' })

    // Sort options by optID
    const options = question.options.map(x => ({ optID: x.optID, opttxt: x.opttxt, nextqID: x.nextqID }))
    options.sort((x, y) => (x.optID > y.optID) ? 1 : -1)

    // Isolate fields that need to be returned
    const { qID, qtext, required, type } = question

    // If format == 'csv', return question in csv format
    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(options.map(option => ({ questionnaireID, qID, qtext, required, type, ...option })))
    }

    // Compose and return question in json format
    return { questionnaireID, qID, qtext, required, type, options }
}

module.exports = getquestion
