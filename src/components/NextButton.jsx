
import {useQuiz} from "../contexts/QuizContext";


function NextButton() {

  const { dispatch, answer,index ,numQuestions}= useQuiz();
  if (index < numQuestions - 1) {

    return (
      <div>
        {answer != null && (
          <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
            Next
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {answer != null && (
          <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default NextButton;
