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

const getquestionnaire = async (quaireID) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID: quaireID })
    const { questionnaireID, questionnaireTitle, keywords } = questionnaire
    const questions = questionnaire.questions.map(x => ({ qID: x.qID, qtext: x.qtext, required: x.required, type: x.type }))
    return { questionnaireID, questionnaireTitle, keywords, questions }
}

module.exports = getquestionnaire
