const mongoose = require('mongoose')
const Questionnaire = require('../models/questionnaire')


// Validate questionnaire. If invalid, throw error
const validateQuestionnaire = (quaire) => {
    const questionnaire = new Questionnaire(quaire)
    
    // If questionnaire does not have valid schema, per the questionnaire model, throw error
    if (questionnaire.validateSync()) throw ({ statusCode: 400, message: 'JSON provided has invalid schema' })


    // If questionnaire has invalid logic, throw error
    const error = { statusCode: 400, message: 'Questionnaire provided has invalid logic' }
    var questions = quaire.questions.slice()
    
    // Seen will contain all qIDs that have been seen in reverse order. '-' is a pseudoqID to signify the end of questions
    const seen = new Set('-')

    // We create a string that is alphabetically larger than the last qID
    var currID = questions[questions.length - 1].qID + "a"
    
    // Check question logic in REVERSE order
    for (var i = questions.length - 1; i >= 0; i--) {
        var q = questions[i]

        // Question MUST be sorted by qID and each qID MUST be unique
        if (currID <= q.qID) throw error

        // The nextqID for any option MUST point to a later question
        for (const option of q.options){
            if (!seen.has(option.nextqID)) throw error
        }

        // Options MUST be sorted by optID and each optID MUST be unique            
        var currOpt = q.options[0]
        for (var j = 1; j < q.options.length; j++) {
            if (currOpt.optID >= q.options[j].optID) throw error
            currOpt = q.options[j]
        }
        
        // Add qID to the set of qIDs we have seen
        seen.add(q.qID)

        currID = q.qID
    }

    return
}


// Add a new questionnaire to db
const questionnaire_upd = async (data) => {
    // If there is no file, throw error
    if (!data) throw ({ statusCode: 400, message: 'No file provided' })

    // If text data is not in json format
    try {
        var quaire = JSON.parse(data)
    } catch (err) {
        throw ({ statusCode: 400, message: 'File provided is not a valid JSON file' })
    }

    // If questionnaire is not valid, throw error
    validateQuestionnaire(quaire)

    const questionnaire = new Questionnaire(quaire)
   
    // If questionnaireID already exists, throw error (questionnaire schema demands that IDs are unique)
    try {
        await questionnaire.save()
    } catch (err) {
        throw ({ statusCode: 400, message: 'A questionnaire with this questionnaireID already exists' })
    }

    return 204
}

module.exports = questionnaire_upd