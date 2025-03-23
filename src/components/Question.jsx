import Options from "./Options.jsx"

import {useQuiz} from "../contexts/QuizContext.jsx";


function Question() {
    const {questions ,dispatch ,answer,index} = useQuiz();
    
    return (
        <div>
            <h4 >{questions[index].question}</h4>
            <Options question={questions[index]} dispatch={dispatch} answer={answer}/>
        </div>
    )
}

export default Question
