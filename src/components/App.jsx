import Header from "./Header";
import Main from "./Main";
import Error from "./Error";

import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Finish from "./Finish";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";


import NextButton from "./NextButton";

import {useQuiz} from "../contexts/QuizContext"

function App() {
  
  const {status}= useQuiz();

  

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen  />}
        {status === "finished" && <Finish />}
        {status === "active" && (
          <>
           <Progress/>
            <Question/>
            <Footer>
            <Timer />
            <NextButton />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}



export default App;
