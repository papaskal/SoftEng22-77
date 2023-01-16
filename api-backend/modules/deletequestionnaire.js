const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const deletequestionnaire = async ({ questionnaireID }) => {
    const res = await Questionnaire.deleteOne({ questionnaireID })
    if (res.deletedCount === 0) throw ({ message: "Questionnaire doesn't exist", statusCode: 400 })
    // await Answer.deleteMany({ questionnaireID })
    return "Questionnaire deleted"
}

module.exports = deletequestionnaire