import { useEffect } from "react"
import {useQuiz} from "../contexts/QuizContext";

function Timer() {
    const {dispatch,remainingSeconds} = useQuiz();

    const min = Math.floor(remainingSeconds/60);
    const sec = remainingSeconds - min*60;
    useEffect(function(){
        const id = setInterval(() => {
            dispatch({type:"tick"});
            console.log("hi");
            
        }, 1000);

        return ()=>clearInterval(id);
    },[dispatch])

    return (
        <div className="timer">
            {min <10 && "0"}
            {min} :
            {sec <10 && "0"}
             {sec}
        </div>
    )
}

export default Timer
