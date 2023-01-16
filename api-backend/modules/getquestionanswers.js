const mongoose = require('mongoose')
const Answer = require('../models/answer')
const { parse } = require('json2csv')


const getquestionanswers = async ({ questionnaireID, questionID }, { format }) => {
    const dbanswers = await Answer.find({ questionnaireID, qID: questionID })
    if (dbanswers.length === 0) throw ({statusCode: 400, message: 'Not found'})

    dbanswers.sort((x, y) => (x.createdAt > y.createdAt) ? 1 : -1)
    const answers = dbanswers.map(x => ({ session: x.session, ans: x.ans }))

    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(answers.map(answer => ({ questionnaireID, questionID, ...answer })))
    }
    return { questionnaireID, questionID, answers }
}

module.exports = getquestionanswers