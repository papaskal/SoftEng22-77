const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')


const getallsessions = async ({ questionnaireID }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })

    const dbanswers = await Answer.find({ questionnaireID })
    // if (dbanswers.length === 0) throw ({statusCode: 400, message: 'Not found'})

    const sessions = [...new Set(dbanswers.map(x => x.session))].sort()

    return sessions
}

module.exports = getallsessions