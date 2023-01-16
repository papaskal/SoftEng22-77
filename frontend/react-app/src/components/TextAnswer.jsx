import { useState } from "react"

function TextAnswer({ choose }) {
    const [text, setText] = useState('')

    const handleTextChange = (event) => {
        setText(event.target.value)
        console.log(text)
        choose(event.target.value)
    }


    return (
        <div>
            <input
                onChange={handleTextChange}
                type="text"
                value={text}
            />
        </div>
    )
}

export default TextAnswer