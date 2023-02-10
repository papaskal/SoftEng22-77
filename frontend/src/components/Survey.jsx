import { useParams } from "react-router-dom"
import { getquestionnaire, getquestion, submitanswers } from "../api"
import { useState, useEffect, useRef } from 'react'
import QuestionnaireCover from "./QuestionnaireCover"
import SurveyQuestion from "./SurveyQuestion"
import QuestionnaireFinal from "./QuestionnaireFinal"
import Container from "react-bootstrap/esm/Container"
import ConfirmationPage from "./ConfirmationPage"


function Survey() {
    const { questionnaireID } = useParams()

    const [questionnaire, setQuestionnaire] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [finished, setFinished] = useState(false)

    const answers = useRef([])
    const answeredQuestions = useRef([])
  

    // The first time this component is rendered, fetch the questionnaire
    useEffect(() => {
        const fetchQuestionnaire = async (questionnaireID) => {
            const res = await getquestionnaire(questionnaireID)
            setQuestionnaire(res.data)
        }

        fetchQuestionnaire(questionnaireID)
    }, [])


    // If finished, then submit all the answers to the server
    useEffect(() => {
        if (finished) {
            submitanswers(questionnaireID, { "answers": answers.current })
        }
    }, [finished])


    // User clicked the submit button, to submit an answer
    const submit = async (ans) => {
        if (ans === null) return
        
        // Save answer, in order to submit to server when questionnaire is finished
        answers.current.push({ questionID: currentQuestion.qID, optionID: ans.optID })
        // Save question and answer text, in order to display them when questionnaire is over
        answeredQuestions.current.push({ question: currentQuestion.qtext, answer: ans.opttxt })

        // If the nextqID == '-', then the questionnaire is over
        if (ans.nextqID === '-') {
            finalConfirmation()
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
            finalConfirmation()
            return
        }

        // Fetch the next question in order
        const curr = await getquestion(questionnaireID, questions[ind + 1].qID)
        setCurrentQuestion(curr.data)
    }


    // User clicked the reset button, to start over the questionnaire
    const reset = () => {
        answers.current = []
        answeredQuestions.current = []
        setFinished(false)
        setCurrentQuestion(null)
    }


    // User clicked start button, to start answering the questionnaire
    const start = async () => {
        const questions = questionnaire.questions
        const res = await getquestion(questionnaireID, questions[0].qID)
        setCurrentQuestion(res.data)
    }

    
    const finalConfirmation = async () => {
        setCurrentQuestion('-')
    }


    // Questionnaire is finished, answers will be submitted to server
    const finish = async () => {
        setFinished(true)
    }


    return (
        <Container>
            <div>
                {finished
                    // If questionnaire is finished, display final page
                    ? < QuestionnaireFinal />
                    : (!currentQuestion
                        
                        // If current question is null, then questionnaire has not started, so display cover page
                        ? < QuestionnaireCover questionnaire={questionnaire} start={start} />
                        : (currentQuestion === '-'
                            
                            // If current question is '-', then display confirmation page, so that the user can finalize their answers
                            ? < ConfirmationPage answeredQuestions={answeredQuestions.current} finish={finish} reset={reset} />

                            // Display question page
                            : < SurveyQuestion question={currentQuestion} submit={submit} skip={skip} reset={reset} />
                        )
                    )
                }
            </div>
        </Container>
    )
}

export default Survey