const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')


// Return all session strings for a questionnaire, sorted alphabetically
const getallsessions = async ({ questionnaireID }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist' })

    // Fetch all answers for this questionnaire and compose session list, sorted by session string
    const dbanswers = await Answer.find({ questionnaireID })
    const sessions = [...new Set(dbanswers.map(x => x.session))].sort()

    return { 'sessions': sessions }
}

module.exports = getallsessions