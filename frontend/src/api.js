import axios from 'axios'

// Fetch a list of all questionnaires
const getallquestionnaires = async () => {
  const res = await axios.get('https://localhost:9103/intelliq_api/allquestionnaires')
  return res
}


// Fetch a questionnaire
const getquestionnaire = async (questionnaireID) => {
  const res = await axios.get(`https://localhost:9103/intelliq_api/questionnaire/${questionnaireID}`)
  return res
}


// Fetch a question of a questionnaire
const getquestion = async (questionnaireID, questionID) => {
  const res = await axios.get(`https://localhost:9103/intelliq_api/question/${questionnaireID}/${questionID}`)
  return res
}


// Submit a list of answers
const submitanswers = async (questionnaireID, answers) => {
  const res = await axios.post(`https://localhost:9103/intelliq_api/submitanswers/${questionnaireID}`, answers)
  return res
}

export { getallquestionnaires, getquestionnaire, getquestion, submitanswers }