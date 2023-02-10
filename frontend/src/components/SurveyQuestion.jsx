import RadioAnswer from "./RadioAnswer"
import TextAnswer from "./TextAnswer"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'


function SurveyQuestion({ question, submit, skip, reset }) {
    const [choice, setChoice] = useState(null)

    const choose = (ans) => {
        setChoice(ans)
    }

    return (
        <Container className="p-3 m-3">
            <Card className="bg-light">
                <Card.Body>
                    <Card.Title>
                        {question.qtext}
                    </Card.Title>
                    {question.options.length === 1
                        // If there is only a single option, then expect an <open string> as an answer
                        ? < TextAnswer choose={(text) => choose({ optID: text, opttxt: text, nextqID: question.options[0].nextqID })} />
                        : < RadioAnswer options={question.options} choose={choose} />
                    }
                    
                    <Stack direction="horizontal" gap={3} className='p-3 m-3'>
                        <div>{question.required.toUpperCase() === 'FALSE' && (<Button onClick={skip}>Skip</Button>)} </div>
                        <div><Button disabled={!choice || (choice.optID === '')} onClick={() => { submit(choice); setChoice(null) }}>Submit</Button></div>
                        <div className="ms-auto"><Button variant="danger" onClick={reset}>Reset</Button></div>
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SurveyQuestion