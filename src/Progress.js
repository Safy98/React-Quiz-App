function Progress({index,numQuestions,points,totalPoints,answer}) {
    return (
        <div className="progress">
            <progress max={numQuestions} value={answer ? index + 1 : index}></progress>
            <p>Question <strong>{index + 1}</strong> / <strong>{numQuestions}</strong></p>
            <p>{points}/{totalPoints}</p>
        </div>
    )
}

export default Progress
