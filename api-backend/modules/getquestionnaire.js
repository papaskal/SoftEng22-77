const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const getquestionnaire = async ({ questionnaireID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({statusCode: 400, message: 'No such questionnaire'})
    const { questionnaireTitle, keywords } = questionnaire
    const questions = questionnaire.questions.map(x => ({ qID: x.qID, qtext: x.qtext, required: x.required, type: x.type }))
    questions.sort((x, y) => (x.qID > y.qID) ? 1 : -1)
    return { questionnaireID, questionnaireTitle, keywords, questions }
}

module.exports = getquestionnaire
