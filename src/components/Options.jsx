import {useQuiz} from "../contexts/QuizContext";



function Options() {
  const { questions, dispatch ,answer ,index } = useQuiz();
  const question = questions[index]; 
    const hasAnswerd = answer !=null;
  return (
    <div className="options">
      {question.options.map((option,index) => (
        <button  key={option} onClick={()=>dispatch({type:"newAnswer",payload:index})}
        className= {`btn btn-option ${index === answer ? "answer":""}
        ${hasAnswerd ? index === question.correctOption ?"correct" :"wrong":""}`}
        disabled = {hasAnswerd}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
