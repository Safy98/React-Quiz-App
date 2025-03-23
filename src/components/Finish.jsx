
import {useQuiz} from "../contexts/QuizContext";


function Finish() {
    const {points,totalPoints,highscore , dispatch} = useQuiz();

    const percentage = (points / totalPoints ) * 100;
    return (
        <>
            <p className="result ">You scored {points} out of {totalPoints} ({Math.ceil(percentage)})%</p>
            <p className="highscore">( hightscore : {highscore} )</p>
            <button onClick={()=>dispatch({type:"restart"})} className="btn btn-ui">Restart</button>
        </>
    )
}

export default Finish
