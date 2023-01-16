
function QuestionnaireCover({questionnaire, start}) {
    return (
        <div>
            <div>Questionnaire: {questionnaire.questionnaireID}</div>
            <div>{questionnaire.questionnaireTitle}</div>
            <div><button onClick={start}>Start</button></div>
        </div>
    )
}

export default QuestionnaireCover