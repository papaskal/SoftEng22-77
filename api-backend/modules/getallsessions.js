const mongoose = require('mongoose')
const Answer = require('../models/answer')


const getallsessions = async ({ questionnaireID }) => {
    const dbanswers = await Answer.find({ questionnaireID })
    const sessions = [...new Set(dbanswers.map(x => x.session))].sort()

    return sessions
}

module.exports = getallsessions