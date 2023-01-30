const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionnaireSchema = new Schema({
    questionnaireID: { type: String, required: true, unique: true, dropDups: true },
    questionnaireTitle: { type: String, required: true },
    keywords: [{ type: String, required: true }],
    questions: {
        type: [
            {
                qID: { type: String, required: true, unique: true, validate: (value) => value != '-' },
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
                    validate: [(value) => value.length > 0]
                }
            }
        ],
        required: true,
        validate: [(value) => value.length > 0]
    }
},
    { timestamps: true })

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema)