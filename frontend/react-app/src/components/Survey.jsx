import { useParams } from "react-router-dom"

function Survey() {
    const { questionnaireID } = useParams()

    return (
        <div>Questionnaire: {questionnaireID}</div>
    )
}

export default Survey