import { useState } from "react"
import Form from 'react-bootstrap/Form'

function TextAnswer({ choose }) {
    const [text, setText] = useState('')

    const handleTextChange = (event) => {
        setText(event.target.value)
        console.log(text)
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

    // return (
    //     <div>
    //         <input
    //             onChange={handleTextChange}
    //             type="text"
    //             value={text}
    //         />
    //     </div>
    // )
}

export default TextAnswer