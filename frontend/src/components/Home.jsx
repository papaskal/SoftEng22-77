import { getallquestionnaires } from '../api'
import { useState, useEffect } from 'react'
import QuestionnaireList from './QuestionnaireList'
import Container from 'react-bootstrap/esm/Container'

function Home() {
  const [questionnaires, setQuestionnaires] = useState([])

  const fetchQuestionnaires = async () => {
    const res = await getallquestionnaires()
    setQuestionnaires(res.data.questionnaires)

  }


  // When this component is first rendered, fetch a list of available questionnaires
  useEffect(() => {
    fetchQuestionnaires()
  }, [])

  
  return (
    <Container>
      < QuestionnaireList questionnaires={questionnaires} />
    </Container>
  )
}

export default Home