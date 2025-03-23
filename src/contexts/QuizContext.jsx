import { createContext, useContext, useEffect, useReducer } from "react";




const initialState = {
    questions: [],
    // loading , error ,ready,active,finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore:0,
    remainingSeconds:null
  };
  const SEC_PER_QUESTION = 30;
  function reduce(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          status: "ready",
          questions: action.payload,
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          remainingSeconds: state.questions.length * SEC_PER_QUESTION,
        };
  
      case "newAnswer":
        let score = 0;
        if (state.questions.at(state.index).correctOption === action.payload) {
          score += state.questions.at(state.index).points;
        }
  
        return {
          ...state,
          answer: action.payload,
          points: state.points + score,
        };
  
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
          highscore: state.points >= state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...initialState,
          questions:state.questions,
          status:"ready",
          highscore:state.highscore
        };
      case "tick":
        return {
          ...state,
          remainingSeconds: state.remainingSeconds - 1,
         status: state.remainingSeconds === 0 ? "finished" :state.status
        };
      default:
        throw new Error("unknown error");
    }
  }
  


  const QuizContext = createContext();

function QuizProvider({children}) {

    const [{ questions, status, index, answer, points,highscore,remainingSeconds }, dispatch] = useReducer(reduce, initialState);
    const totalPoints = questions.reduce((acc, question) => acc + question.points,0);
    const numQuestions = questions.length;


    useEffect(function () {
        fetch("http://localhost:9000/questions")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }));
      }, []);


    return (
        <QuizContext.Provider value={{ questions, status, index, answer, points,highscore,remainingSeconds,dispatch ,totalPoints ,numQuestions}}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz(){

    const value = useContext(QuizContext);
    if (value === undefined ) throw new Error("Can't use Context outside its provider scope");
    

    return value;
}

export default QuizProvider;
export {useQuiz} 
