import { useState } from "react"
import Form from 'react-bootstrap/Form'

function RadioAnswer({ options, choose }) {
    const [selected, setSelected] = useState()

    const handleChange = (event) => {
        const choice = options.find((option) => option.optID===event.currentTarget.value)
        choose(choice)
    }

    return (
        <Form className="p-3 m-3">
                {options.map((option) => {
                    return (
                        <div key={option.optID}>
                            <Form.Check
                                type="radio"
                                id={option.optID}
                                name='choice'
                                value={option.optID}
                                onChange={handleChange}
                                label={option.opttxt}
                            />
                        </div>
                    )
                })}
        </Form>
    )
}

export default RadioAnswer