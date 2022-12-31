const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    questionnaireID: String,
    session: String,
    qID: String,
    ans: String,
},
    { timestamps: true })

module.exports = mongoose.model('Answer', AnswerSchema)