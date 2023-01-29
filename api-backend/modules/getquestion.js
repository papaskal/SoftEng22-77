const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestion = async ({ questionnaireID, questionID }, { format }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    const question = questionnaire.questions.filter(x => x.qID === questionID)[0]
    if (!question) throw ({ statusCode: 400, message: 'Question does not exist.' })

    const options = question.options.map(x => ({ optID: x.optID, opttxt: x.opttxt, nextqID: x.nextqID }))
    options.sort((x, y) => (x.optID > y.optID) ? 1 : -1)
    const { qID, qtext, required, type } = question

    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(options.map(option => ({ questionnaireID, qID, qtext, required, type, ...option })))
    }
    return { questionnaireID, qID, qtext, required, type, options }
}

module.exports = getquestion
