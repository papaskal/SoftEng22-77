const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const deletequestionnaire = async ({ questionnaireID }) => {
    const res = await Questionnaire.deleteOne({ questionnaireID })
    if (res.deletedCount === 0) throw ({ message: "Questionnaire does not exist", statusCode: 400 })   // If nothing was deleted, throw error

    return { status: "OK" }
}

module.exports = deletequestionnaire