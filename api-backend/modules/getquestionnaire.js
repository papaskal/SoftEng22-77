const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestionnaire = async ({ questionnaireID }, { format }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Not found' })

    const { questionnaireTitle, keywords } = questionnaire
    const questions = questionnaire.questions.map(x => ({ qID: x.qID, qtext: x.qtext, required: x.required, type: x.type }))
    questions.sort((x, y) => (x.qID > y.qID) ? 1 : -1)
    
    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(questions.map(question => ({ questionnaireID, questionnaireTitle, keywords, ...question })))
    }
    return { questionnaireID, questionnaireTitle, keywords, questions }
}

module.exports = getquestionnaire
