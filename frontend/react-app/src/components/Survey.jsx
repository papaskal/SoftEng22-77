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
    }


    // The first time this component is rendered, fetch the questionnaire
    useEffect(() => {
        fetchQuestionnaire(questionnaireID)
    }, [])


    // If finished, then submit all the answers to the server, and then cleanup
    useEffect(() => {
        if (finished && currentQuestion) {
            submitanswers(questionnaireID, { "answers": answers })
        }
        return function cleanup() {
            if (finished) setCurrentQuestion(null)
        }
    }, [finished])


    // User clicked the submit button, to submit an answer
    const submit = async (ans) => {
        if (ans === null) return

        // Save answer
        setAnswers([...answers, { questionID: currentQuestion.qID, optionID: ans.optID }])

        // If the nextqID == '-', then the questionnaire is over
        if (ans.nextqID === '-') {

            finish()
            return
        }

        // Fetch the next question, according to the nextqID of the option selected
        const res = await getquestion(questionnaireID, ans.nextqID)
        setCurrentQuestion(res.data)
    }


    // User clicked the skip button, to skip a not-required question
    const skip = async () => {
        const questions = questionnaire.questions
        const ind = questions.findIndex((question) => question.qID === currentQuestion.qID)

        // If this was the last question of the questionnaire, then the questionnaire is over
        if (ind >= questions.length - 1) {
            finish()
            return
        }

        // Fetch the next question in order
        const curr = await getquestion(questionnaireID, questions[ind + 1].qID)
        setCurrentQuestion(curr.data)
    }


    // User clicked the reset button, to start over the questionnaire
    const reset = () => {
        setAnswers([])
        setFinished(false)
        setCurrentQuestion(null)
    }


    // User clicked start button, to start answering the questionnaire
    const start = async () => {
        const questions = questionnaire.questions
        const res = await getquestion(questionnaireID, questions[0].qID)
        setCurrentQuestion(res.data)
    }


    // Questionnaire has reached the end
    const finish = async () => {
        setFinished(true)
    }


    return (
        <Container>

            <div>
                {finished
                    ? < QuestionnaireFinal />
                    : (!currentQuestion
                        ? < QuestionnaireCover questionnaire={questionnaire} start={start} />
                        : < SurveyQuestion question={currentQuestion} submit={submit} skip={skip} reset={reset} />
                    )
                }
            </div>
        </Container>
    )
}

export default Survey