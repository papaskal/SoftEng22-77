const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require('../models/answer')

const resetall = async () => {
    // Delete all questionnaires from db
    await Questionnaire.deleteMany({})

    // Delete all answers from db
    await Answer.deleteMany({})
    
    return { "status": "OK" }
}

module.exports = resetall