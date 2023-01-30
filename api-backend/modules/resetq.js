const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')
const Answer = require("../models/answer")

const resetDB = async ({ questionnaireID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    await Answer.deleteMany({ questionnaireID })
    return { "status": "OK" }
}

module.exports = resetDB