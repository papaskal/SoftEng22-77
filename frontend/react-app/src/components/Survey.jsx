import { useParams } from "react-router-dom"
import { getquestionnaire, getquestion, submitanswers } from "../api"
import { useState, useEffect } from 'react'
import QuestionnaireCover from "./QuestionnaireCover"
import SurveyQuestion from "./SurveyQuestion"
import QuestionnaireFinal from "./QuestionnaireFinal"
import Container from "react-bootstrap/esm/Container"

function Survey() {
    const { questionnaireID } = useParams()

    const [questionnaire, setQuestionnaire] = useState({})
    const [answers, setAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [finished, setFinished] = useState(false)

    const fetchQuestionnaire = async (questionnaireID) => {
        const res = await getquestionnaire(questionnaireID)
        setQuestionnaire(res.data)
        console.log(questionnaire)
    }

    useEffect(() => {
        console.log('hi')
        fetchQuestionnaire(questionnaireID)
    }, [])

    const submit = async (ans) => {
        console.log(ans)
        console.log(answers)

        if (ans === null) return
        setAnswers([...answers, { questionID: currentQuestion.qID, optionID: ans.optID }])
        if (ans.nextqID === '-') {
            
            finish()
            return
        }
        const res = await getquestion(questionnaireID, ans.nextqID)
        setCurrentQuestion(res.data)
    }

    const skip = async () => {
        const questions = questionnaire.questions
        const ind = questions.findIndex((question) => question.qID === currentQuestion.qID)
        if (ind >= questions.length - 1) {
            finish()
            return
        }
        const curr = await getquestion(questionnaireID, questions[ind + 1].qID)
        setCurrentQuestion(curr.data)
    }

    const reset = () => {
        console.log(currentQuestion)
        setAnswers([])
        setFinished(false)
        setCurrentQuestion(null)
    }

    const start = async () => {
        const questions = questionnaire.questions
        console.log(questions)
        const res = await getquestion(questionnaireID, questions[0].qID)
        setCurrentQuestion(res.data)
    }

    const finish = async () => {
        console.log(questionnaireID)
        console.log(answers)
        setFinished(true)
        setCurrentQuestion(null)
        const res = await submitanswers(questionnaireID, answers)
        return res
    }

    return (
        <Container>

            <div>
                {finished
                    ? < QuestionnaireFinal />
                    : (!currentQuestion
                        ? < QuestionnaireCover questionnaire={questionnaire} start={start} />
                        : < SurveyQuestion question={currentQuestion} submit={submit} skip={skip} reset={reset}/>
                    )
                }
            </div>
        </Container>
    )
}

export default Survey