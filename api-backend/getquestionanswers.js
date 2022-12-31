const mongoose = require('mongoose')
const Answer = require('./models/answer')


const getquestionanswers = async ({ questionnaireID, questionID }) => {
    const dbanswers = await Answer.find({ questionnaireID, qID: questionID })
    dbanswers.sort((x, y) => (x.createdAt > y.createdAt) ? 1 : -1)
    const answers = dbanswers.map(x => ({ session: x.session, ans: x.ans }))

    return { questionnaireID, questionID, answers }
}

module.exports = getquestionanswers