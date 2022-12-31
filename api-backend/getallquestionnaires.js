const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')


const getallquestionnaires = async () => {
    const dbquestionnaires = await Questionnaire.find({})
    dbquestionnaires.sort((x, y) =>  (x.createdAt < y.createdAt) ? 1 : -1 )
    const questionnaires = dbquestionnaires.map(x => ({ questionnaireID: x.questionnaireID, questionnaireTitle: x.questionnaireTitle}))
    
    return questionnaires
}

module.exports = getallquestionnaires