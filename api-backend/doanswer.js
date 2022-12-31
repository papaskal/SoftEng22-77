const mongoose = require('mongoose')
const Answer = require('./models/answer')


const doanswer = async ({ questionnaireID, questionID, session, optionID }) => {
    const answer = new Answer({ questionnaireID, qID: questionID, session, ans: optionID })
    await answer.save()
    return 200
}

module.exports = doanswer
