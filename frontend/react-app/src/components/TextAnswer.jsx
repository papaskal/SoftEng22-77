import { useState } from "react"
import Form from 'react-bootstrap/Form'

function TextAnswer({ choose }) {
    const [text, setText] = useState('')

    // Control the text input
    const handleTextChange = (event) => {
        setText(event.target.value)
        choose(event.target.value)
    }


    return (
        <div>
            <Form.Control
                onChange={handleTextChange}
                type="text"
                value={text}
            />
        </div>
    )
}

export default TextAnswer