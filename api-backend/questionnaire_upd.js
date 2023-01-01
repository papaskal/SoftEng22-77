const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')


const addquestionnaire = async ({ file }) => {
    const fd = JSON.parse(file)
    const questionnaire = new Questionnaire(fd)
    await questionnaire.save()
    return 200
}

module.exports = addquestionnaire