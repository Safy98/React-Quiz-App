import { useEffect } from "react"

function Timer({dispatch,remainingSeconds}) {

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
