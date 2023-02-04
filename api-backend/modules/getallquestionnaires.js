const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


// Return a list of all questionnaires (titles and IDs), sorted by creation date
const getallquestionnaires = async () => {
    // Fetch all questionnaires from database
    const dbquestionnaires = await Questionnaire.find({})

    // Sort questionnaires by creation date and return questionnaireIDs and questionnaireTitles
    if (dbquestionnaires.length === 0) return []
    dbquestionnaires.sort((x, y) => (x.createdAt > y.createdAt) ? 1 : -1)
    const questionnaires = dbquestionnaires.map(x => ({ questionnaireID: x.questionnaireID, questionnaireTitle: x.questionnaireTitle }))

    return { 'questionnaires': questionnaires }
}

module.exports = getallquestionnaires