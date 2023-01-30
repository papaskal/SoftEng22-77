const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require('../models/answer')

const resetall = async () => {
    await Questionnaire.deleteMany({})
    await Answer.deleteMany({})
    return { "status": "OK" }
}

module.exports = resetall