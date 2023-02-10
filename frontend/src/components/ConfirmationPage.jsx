import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'


function ConfirmationPage({ answeredQuestions, finish, reset }) {
    return (
        <Container className="p-3 m-3">
            <Card className="bg-light">
                <h1 className="p-3"> Final Confirmation</h1>
                <Card.Body>
                    {answeredQuestions.map((answeredQuestion, index) => {
                        return (
                            <div key={index}>
                                <Card.Title>
                                    {answeredQuestion.question}
                                </Card.Title>
                                {answeredQuestion.answer}
                                <hr />
                            </div>
                        )
                    })}

                    <Stack direction="horizontal" gap={3} className='p-3 m-3'>
                        <div><Button onClick={finish}>Confirm and submit</Button></div>
                        <div className="ms-auto"><Button variant="danger" onClick={reset}>Reset</Button></div>
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ConfirmationPage