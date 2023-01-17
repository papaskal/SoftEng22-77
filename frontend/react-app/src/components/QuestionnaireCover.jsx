import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

function QuestionnaireCover({ questionnaire, start }) {
    return (
        <Container className='p-3 m-3 text-center'>
            <Card className='bg-light'>
                <Card.Body>
                    <Card.Title>{questionnaire.questionnaireTitle}</Card.Title>
                    {((Object.keys(questionnaire).length > 0) && (questionnaire.keywords.length > 0)) && <Card.Text>keywords: {questionnaire.keywords.join(', ')}</Card.Text>}
                    <Stack className='mx-auto' gap={5}>
                        <div><Button variant='primary' onClick={start}>Start</Button></div>
                        <div>
                            <Link to='/' >
                                <Button variant='primary'>Back to all questionnaires</Button>
                            </Link>
                        </div>
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    )

    // return (
    //     <div>
    //         <div>Questionnaire: {questionnaire.questionnaireID}</div>
    //         <div>{questionnaire.questionnaireTitle}</div>
    //         <div><button onClick={start}>Start</button></div>
    //     </div>
    // )
}

export default QuestionnaireCover