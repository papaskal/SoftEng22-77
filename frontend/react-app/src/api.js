import axios from 'axios'

const getallquestionnaires = async () => {
  const res = await axios.get('https://localhost:9103/intelliq_api/allquestionnaires')
  return res
}


const getquestionnaire = async (questionnaireID) => {
  const res = await axios.get(`https://localhost:9103/intelliq_api/questionnaire/${questionnaireID}`)
  return res
}

const getquestion = async (questionnaireID, questionID) => {
  const res = await axios.get(`https://localhost:9103/intelliq_api/question/${questionnaireID}/${questionID}`)
  return res
}

export { getallquestionnaires, getquestionnaire, getquestion }