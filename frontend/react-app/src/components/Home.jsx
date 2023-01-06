import { getallquestionnaires } from '../api'
import { useState, useEffect } from 'react'

function Home() {
  const [questionnaires, setQuestionnaires] = useState([])

  const fetchQuestionnaires = async () => {
    const res = await getallquestionnaires()
    setQuestionnaires(res.data)

  }

  useEffect(() => {
    fetchQuestionnaires()
  }, [])

  return (
    <div>
      <ul>
        {questionnaires.map((questionnaire) => {
          return (
            <li key={questionnaire.questionnaireID}>
              {questionnaire.questionnaireTitle}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home