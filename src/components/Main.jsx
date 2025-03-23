import Error from "./Error";

import {useQuiz} from "../contexts/QuizContext";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Finish from "./Finish";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";


import NextButton from "./NextButton";




function Main() {

    const {status}= useQuiz();
    return (
      <main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
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
        </main>
    )
}

export default Main
