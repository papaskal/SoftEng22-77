const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const deletequestionnaire = async ({ questionnaireID }) => {
    const res = await Questionnaire.deleteOne({ questionnaireID })
    
    // If nothing was deleted, throw error
    if (res.deletedCount === 0) throw ({ message: "Questionnaire does not exist", statusCode: 400 })   

    return { status: "OK" }
}

module.exports = deletequestionnaire