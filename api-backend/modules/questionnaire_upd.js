const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


const validateQuestionnaire = (quaire) => {
    const questionnaire = new Questionnaire(quaire)
    if (questionnaire.validateSync()) throw ({ statusCode: 400, message: 'JSON provided has invalid schema.' })

    const error = { statusCode: 400, message: 'Questionnaire provided has invalid logic.' }
    var questions = quaire.questions.slice()
    const seen = new Set('-')

    var currID = questions[questions.length - 1].qID + "a"
    
    for (var i = questions.length - 1; i >= 0; i--) {
        var q = questions[i]
        if (currID <= q.qID) throw error

        for (const option of q.options){
            if (!seen.has(option.nextqID)) throw error
        }

        var currOpt = q.options[0]
        for (var j = 1; j < q.options.length; j++) {
            if (currOpt.optID >= q.options[j].optID) throw error
            currOpt = q.options[j]
        }
        
        seen.add(q.qID)
        currID = q.qID
    }

    return
}

const addquestionnaire = async (data) => {
    if (!data) throw ({ statusCode: 400, message: 'No file provided.' })

    try {
        var quaire = JSON.parse(data)
    } catch (err) {
        throw ({ statusCode: 400, message: 'File provided is not a valid JSON file.' })
    }

    validateQuestionnaire(quaire)

    const questionnaire = new Questionnaire(quaire)
   
    try {
        await questionnaire.save()
    } catch (err) {
        throw ({ statusCode: 400, message: 'A questionnaire with this questionnaireID already exists.' })
    }

    return "Questionnaire added successfully."
}

module.exports = addquestionnaire