const mongoose = require('mongoose')
const Answer = require('./models/answer')


const getsessionanswers = async ({ questionnaireID, session }) => {
    const dbanswers = await Answer.find({ questionnaireID, session })
    const answers = dbanswers.map(x => ({ qID: x.qID, ans: x.ans}))
    answers.sort((x, y) =>  (x.qID > y.qID) ? 1 : -1 )
    
    return { questionnaireID, session, answers }
}

module.exports = getsessionanswers