const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require("../models/answer")

const resetq = async ({ questionnaireID }) => {
    // If questionnaireID does not exist, throw error
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    // Delete all answers corresponding to this questionnaire
    await Answer.deleteMany({ questionnaireID })

    return { "status": "OK" }
}

module.exports = resetq