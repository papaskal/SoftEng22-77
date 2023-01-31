const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestionnaire = async ({ questionnaireID }, { format }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // Sort questions by qID
    const { questionnaireTitle, keywords } = questionnaire
    const questions = questionnaire.questions.map(x => ({ qID: x.qID, qtext: x.qtext, required: x.required, type: x.type }))
    questions.sort((x, y) => (x.qID > y.qID) ? 1 : -1)
    
    // If format == 'csv', return questionnaire in csv format
    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(questions.map(question => ({ questionnaireID, questionnaireTitle, keywords, ...question })))
    }

    // Compose and return questionnaire in json format
    return { questionnaireID, questionnaireTitle, keywords, questions }
}

module.exports = getquestionnaire
