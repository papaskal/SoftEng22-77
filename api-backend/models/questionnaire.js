const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionnaireSchema = new Schema({
    questionnaireID: String,
    questionnaireTitle: String,
    keywords: [String],
    questions: [
        {
            qID: String,
            qtext: String,
            required: { type: String },
            type: { type: String },
            options: [
                {
                    optID: String,
                    opttxt: String,
                    nextqID: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema)