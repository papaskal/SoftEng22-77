const mongoose = require('mongoose')
const Questionnaire = require('./models/questionnaire')
const Answerraire = require('./models/answerraire')

const resetDB = async () => {
    await Questionnaire.deleteMany({})
    await Answerraire.deleteMany({})
    return 200
}

module.exports = resetDB