import { useParams } from "react-router-dom"
import { getquestionnaire, getquestion } from "../api"
import { useState, useEffect } from 'react'
import QuestionnaireCover from "./QuestionnaireCover"
import SurveyQuestion from "./SurveyQuestion"
import QuestionnaireFinal from "./QuestionnaireFinal"

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
            setFinished(true)
            setCurrentQuestion(null)
            return
        }
        const res = await getquestion(questionnaireID, ans.nextqID)
        setCurrentQuestion(res.data)
    }

    const skip = async () => {
        const questions = questionnaire.questions
        const ind = questions.findIndex((question) => question.qID === currentQuestion.qID)
        if (ind >= questions.length - 1) {
            setFinished(true)
            setCurrentQuestion(null)
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

    const finish = () => {

    }

    return (
        <div>

            <div>
                {finished
                    ? < QuestionnaireFinal />
                    : (!currentQuestion
                        ? < QuestionnaireCover questionnaire={questionnaire} start={start} />
                        : < SurveyQuestion question={currentQuestion} submit={submit} skip={skip} />
                    )
                }
            </div>
            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Survey