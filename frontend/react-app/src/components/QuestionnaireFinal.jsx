import React from 'react'
import { Link } from 'react-router-dom'

function QuestionnaireFinal() {
  return (
    <div>
      <p>
        Thank you for participating in our survey
      </p>
      <Link to='/' >
        <button>Back to all questionnaires</button>
      </Link>
    </div>
  )
}

export default QuestionnaireFinal