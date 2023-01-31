const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionnaireSchema = new Schema({
    questionnaireID: { type: String, required: true, unique: true, dropDups: true },        // questionnaireID MUST be unique
    questionnaireTitle: { type: String, required: true },
    keywords: [{ type: String, required: true }],
    questions: {
        type: [
            {
                qID: { type: String, required: true, validate: (value) => value != '-' },   //qID cannot be '-'
                qtext: { type: String, required: true },
                required: { type: String, required: true },
                type: { type: String, required: true },
                options: {
                    type: [
                        {
                            optID: { type: String, required: true },
                            opttxt: { type: String, required: true },
                            nextqID: { type: String, required: true }
                        }
                    ],
                    validate: [(value) => value.length > 0]                                 //options list cannot be empty
                }
            }
        ],
        required: true,
        validate: [(value) => value.length > 0]                                             //questions list cannot be empty
    }
},
    // Add creation date and last update date
    { timestamps: true })

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema)