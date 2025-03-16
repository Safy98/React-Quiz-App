function NextButton({ dispatch, answer,index ,numQuestions}) {
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
