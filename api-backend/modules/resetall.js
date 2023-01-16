const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answerraire = require('../models/answerraire')
const Answer = require('../models/answer')

const resetDB = async () => {
    await Questionnaire.deleteMany({})
    await Answerraire.deleteMany({})
    await Answer.deleteMany({})
    return 200
}

module.exports = resetDB