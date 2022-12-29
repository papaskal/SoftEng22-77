const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')
const Answerraire = require('./models/answerraire')

const resetDB = async (questionnaireID) => {
    await Answerraire.deleteMany({ questionnaireID })
    return 200
}

module.exports = resetDB