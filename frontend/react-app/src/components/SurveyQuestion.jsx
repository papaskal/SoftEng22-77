import RadioAnswer from "./RadioAnswer"
import TextAnswer from "./TextAnswer"
import { useState } from "react"

function SkippableQuestion({ question, submit, skip }) {
    const [choice, setChoice] = useState(null)

    const choose = (ans) => {
        setChoice(ans)
        console.log(ans)
    }

    return (
        <div>
            <p>
                {question.qtext}
            </p>
            {question.options.length === 1
                ? < TextAnswer choose={(text) => choose({ optID: text, nextqID: question.options[0].nextqID })} />
                : < RadioAnswer options={question.options} choose={choose} />
            }

            <div></div>
            {question.required.toUpperCase() === 'FALSE' && (<button onClick={skip}>Skip</button>)}
            <button onClick={() => {submit(choice); setChoice(null)}}>Submit</button>
        </div>
    )
}

export default SkippableQuestion