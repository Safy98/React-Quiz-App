// import './App.css';
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";

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

function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "finished" && <Finish dispatch={dispatch} points={points} totalPoints = {totalPoints} highscore={highscore} />}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} answer={answer} totalPoints={totalPoints} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
            <Timer remainingSeconds={remainingSeconds} dispatch={dispatch}></Timer>
            <NextButton dispatch={dispatch} answer={answer} index ={index} numQuestions ={numQuestions} ></NextButton>
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
