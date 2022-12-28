const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')


const addQuestionnaire = async (req) => {
    const fD = JSON.parse(req.body.file)
    const questionnaire = new Questionnaire(fD)
    await questionnaire.save()
    return 200
}

module.exports = addQuestionnaire
