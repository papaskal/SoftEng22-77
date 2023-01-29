const mongoose = require('mongoose')
const Answer = require('../models/answer')
const Questionnaire = require('../models/questionnaire')
const { parse } = require('json2csv')


const getquestionanswers = async ({ questionnaireID, questionID }, { format }) => {
    const questionnaire = await Questionnaire.findOne({ questionnaireID })
    if (!questionnaire) throw ({ statusCode: 400, message: 'Questionnaire does not exist.' })
    if (!questionnaire.questions.find(x => x.qID === questionID)) throw ({ statusCode: 400, message: 'Question does not exist.' })

    const dbanswers = await Answer.find({ questionnaireID, qID: questionID })
    // if (dbanswers.length === 0) throw ({statusCode: 400, message: 'Not found'})

    dbanswers.sort((x, y) => (x.createdAt > y.createdAt) ? 1 : -1)
    const answers = dbanswers.map(x => ({ session: x.session, ans: x.ans }))

    if (typeof format === 'string' && format.toUpperCase() === 'CSV') {
        if (answers.length === 0) return ('"questionnaireID","questionID","session","ans"')
        return parse(answers.map(answer => ({ questionnaireID, questionID, ...answer })))
    }
    return { questionnaireID, questionID, answers }
}

module.exports = getquestionanswers