const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const getquestion = async ({ questionnaireID, questionID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    const question = questionnaire.questions.filter(x => x.qID === questionID)[0]
    const options = question.options.map(x => ({ optID: x.optID, opttxt: x.opttxt, nextqID: x.nextqID }))
    options.sort((x, y) =>  (x.optID > y.optID) ? 1 : -1 )
    const { qID, qtext, required, type } = question
    return { questionnaireID: questionnaireID, qID, qtext, required, type, options }
}

module.exports = getquestion
