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

const getquestion = async ({ questionnaireID, questionID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    const question = questionnaire.questions.filter(x => x.qID === questionID)[0]
    const options = question.options.map(x => ({optID: x.optID, opttxt: x.opttxt, nextqID: x.nextqID}))
    const {qID, qtext, required, type} = question
    return {questionnaireID: questionnaireID, qID, qtext, required, type, options}
}

module.exports = getquestion
