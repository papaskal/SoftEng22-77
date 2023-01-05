import axios from 'axios'

const getallquestionnaires = async () => {
    const res = await axios.get('https://localhost:9103/intelliq_api/allquestionnaires')
    return res
  }

export {getallquestionnaires}