const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    questionnaireID: String,
    session: String,
    qID: String,
    ans: String,
},
    // Add creation date and last update date
    { timestamps: true })

module.exports = mongoose.model('Answer', AnswerSchema)