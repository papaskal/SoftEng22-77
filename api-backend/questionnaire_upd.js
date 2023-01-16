const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')


const addquestionnaire = async (data) => {
    const quaire = JSON.parse(data)
    const questionnaire = new Questionnaire(quaire)
    await questionnaire.save()
    return 200
}

module.exports = addquestionnaire