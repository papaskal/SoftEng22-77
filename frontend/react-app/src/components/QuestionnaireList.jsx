import { Link } from 'react-router-dom'

function QuestionnaireList({ questionnaires }) {
    return (
        <div>
            <ul>
                {questionnaires.map((questionnaire) => {
                    return (
                        <li key={questionnaire.questionnaireID}>
                            {questionnaire.questionnaireTitle}
                            < Link to={`/survey/${questionnaire.questionnaireID}`} >
                                <button>HI</button>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuestionnaireList