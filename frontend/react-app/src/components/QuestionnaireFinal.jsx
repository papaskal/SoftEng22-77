import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

function QuestionnaireFinal() {
  return (
    <Container className='p-3 m-3 text-center'>
      <Card className='bg-light'>
        <Card.Body>
          <Card.Title className='p-3 m-3'>
            Thank you for participating in our survey!
          </Card.Title>
          <Link to='/' >
            <Button>Back to all questionnaires</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

//   return (
//     <div>
//       <p>
//         Thank you for participating in our survey
//       </p>
//       <Link to='/' >
//         <button>Back to all questionnaires</button>
//       </Link>
//     </div>
//   )


export default QuestionnaireFinal