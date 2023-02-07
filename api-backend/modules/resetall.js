const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require('../models/answer')


// Reset database, ie delete all questionnaires and answers from the database
const resetall = async () => {
    // Delete all questionnaires from db
    await Questionnaire.deleteMany({})

    // Delete all answers from db
    await Answer.deleteMany({})
    
    return { "status": "OK" }
}

module.exports = resetall