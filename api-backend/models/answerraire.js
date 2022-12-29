const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerraireSchema = new Schema({
    questionnaireID: String,
    session: String,
    keywords: [String],
    answers: [
        {
            qID: String,
            ans: String
        }
    ]
})

module.exports = mongoose.model('Answerraire', AnswerraireSchema)