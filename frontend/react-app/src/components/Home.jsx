import { getallquestionnaires } from '../api'
import { useState, useEffect } from 'react'
import QuestionnaireList from './QuestionnaireList'

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
      < QuestionnaireList questionnaires={questionnaires} />
    </div>
  )
}

export default Home