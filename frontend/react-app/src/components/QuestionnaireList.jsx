import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

// function QuestionnaireList({ questionnaires }) {
//     return (
//         <div>
//             <ul>
//                 {questionnaires.map((questionnaire) => {
//                     return (
//                         <li key={questionnaire.questionnaireID}>
//                             {questionnaire.questionnaireTitle}
//                             < Link to={`/survey/${questionnaire.questionnaireID}`} >
//                                 <button>{questionnaire.questionnaireID}</button>
//                             </Link>
//                         </li>
//                     )
//                 })}
//             </ul>
//         </div>
//     )
// }

function QuestionnaireList({ questionnaires }) {
    return (
        <Container className='p-3 m-3 text-center'>
            {questionnaires.map((questionnaire) => {
                return (
                    <Card key={questionnaire.questionnaireID} className='p-3 m-3'>
                        <Card.Title>
                            {questionnaire.questionnaireTitle}
                        </Card.Title>
                        < Link to={`/survey/${questionnaire.questionnaireID}`} >
                            <Button variant='primary'>Take this survey</Button>
                        </Link>
                    </Card>
                )
            })}
        </Container>
    )
}

// function QuestionnaireList({ questionnaires }) {
//     return (
//         <Container className='p-3 m-3'>
//             <ListGroup>
//                 {questionnaires.map((questionnaire) => {
//                     return (
//                         <ListGroup.Item key={questionnaire.questionnaireID}>
//                             {questionnaire.questionnaireTitle}
//                             < Link to={`/survey/${questionnaire.questionnaireID}`} >
//                                 <button>{questionnaire.questionnaireID}</button>
//                             </Link>
//                         </ListGroup.Item>
//                     )
//                 })}
//             </ListGroup>
//         </Container>
//     )
// }

export default QuestionnaireList