const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')


// const getQuestionnaire = async (questionnaireID) => {
//     const questionnaire = await Questionnaire.find({questionnaireID})
//     return questionnaire
// }

// const getQuestionnaire = async (questionnaireID) => {
//     const questionnaire = await Questionnaire.find({ questionnaireID })
//     const result = (({ questionnaireID, questionnaireTitle, keywords, questions: [{ qID, qtext, required, type }] }) =>
//     ({ questionnaireID, questionnaireTitle, keywords, questions: [{ qID, qtext, required, type }] }))(questionnaire)
//     return result
// }

const getquestionnaire = async ({ questionnaireID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    const { questionnaireTitle, keywords } = questionnaire
    const questions = questionnaire.questions.map(x => ({ qID: x.qID, qtext: x.qtext, required: x.required, type: x.type }))
    questions.sort((x, y) => (x.qID > y.qID) ? 1 : -1)
    return { questionnaireID, questionnaireTitle, keywords, questions }
}

module.exports = getquestionnaire
