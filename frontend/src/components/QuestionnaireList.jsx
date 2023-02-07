import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function QuestionnaireList({ questionnaires }) {
    return (
        <Container className='p-3 m-3 text-center'>
            {questionnaires.map((questionnaire) => {
                return (
                    <Card key={questionnaire.questionnaireID} className='p-3 m-3'>
                        <Card.Body>
                            <Card.Title>
                                {questionnaire.questionnaireTitle}
                            </Card.Title>
                            < Link to={`/survey/${questionnaire.questionnaireID}`} >
                                <Button variant='primary'>Take this survey</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    )
}

export default QuestionnaireList