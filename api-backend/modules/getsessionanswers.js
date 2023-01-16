const mongoose = require('mongoose')
const Answer = require('../models/answer')
const { parse } = require('json2csv')


const getsessionanswers = async ({ questionnaireID, session }, { format }) => {
    const dbanswers = await Answer.find({ questionnaireID, session })
    if (dbanswers.length === 0) throw ({statusCode: 400, message: 'Not found'})

    const answers = dbanswers.map(x => ({ qID: x.qID, ans: x.ans }))
    answers.sort((x, y) => (x.qID > y.qID) ? 1 : -1)

    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        return parse(answers.map(answer => ({ questionnaireID, session, ...answer })))
    }
    return { questionnaireID, session, answers }
}

module.exports = getsessionanswers