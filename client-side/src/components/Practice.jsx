import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'



export default function Practice() {
  const [words, setWords] = useState([])
  const [word, setWord] = useState("")
  const [progress, setProgress] = useState(0)
  const [index, setIndex] = useState(1)
  const [flag, setFlag] = useState("")
  const [isChosen, setIsChosen] = useState(false)
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState(0)
  const [questionsNumber, setQuestionsNumber] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/words`).then((res) => {
      setWords(res.data.selectedWordList);
      setWord(res.data.selectedWordList[0].word)
      setQuestionsNumber(res.data.selectedWordList.length)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const checkAnswer = (partOfSpeech) => {
    setIsChosen(true)
    if (index < questionsNumber) {
      if (partOfSpeech === words[index - 1].pos) {
        setFlag(partOfSpeech + "Correct")
        setCorrectAnswersNumber(correctAnswersNumber + 1)
      } else {
        setFlag(partOfSpeech + "Wrong")
      }
    } else {
      setProgress(100)
      //check the latest word only because of tha lag of the values of the variables 
      if (partOfSpeech === words[index - 1].pos) {
        navigate('/rank', { state: { score: ((correctAnswersNumber + 1) / questionsNumber) * 100 }, replace: true });
      } else {
        navigate('/rank', { state: { score: ((correctAnswersNumber) / questionsNumber) * 100 }, replace: true });
      }
    }
  }

  const nextQuestion = () => {
    setProgress((index / questionsNumber) * 100)
    setIndex(index + 1)
    setWord(words[index].word)
    setFlag("")
    setIsChosen(false)
  }

  return (
    <div className='text-center p-5 bg-light row align-items-center' style={{ minHeight: "48rem" }}>
      <div className='col gap-2 row text-center justify-content-center align-items-center'>
        <p className='mb-3 fs-4'>Choose the corret part of speech for the followig word: </p>
        <div className='rounded-pill col-1 pt-1 mb-3' style={{ backgroundColor: "#c4c1c4", width:"23rem" }}>
          <h1>{word}</h1>
        </div>
        <div className='row justify-content-center gap-5 mb-5'>
          <Button className={"col-1 "+(flag === "verbWrong" ? ('bg-danger') : flag === "verbCorrect" ? ("bg-success") : ("bg-dark"))} disabled={!(flag === "verbWrong" || flag === "verbCorrect" || flag === "")} onClick={(() => checkAnswer("verb"))}>Verb</Button>
          <Button className={"col-1 "+(flag === "nounWrong" ? ('bg-danger') : flag === "nounCorrect" ? ("bg-success") : ("bg-dark"))} disabled={!(flag === "nounWrong" || flag === "nounCorrect" || flag === "")} onClick={() => checkAnswer("noun")}>Noun</Button>
          <Button className={"col-1 "+(flag === "adverbWrong" ? ('bg-danger') : flag === "adverbCorrect" ? ("bg-success") : ("bg-dark"))} disabled={!(flag === "adverbWrong" || flag === "adverbCorrect" || flag === "")} onClick={() => checkAnswer("adverb")}>Adverb</Button>
          <Button className={"col-1 "+(flag === "adjectiveWrong" ? ('bg-danger') : flag === "adjectiveCorrect" ? ("bg-success") : ("bg-dark"))} disabled={!(flag === "adjectiveWrong" || flag === "adjectiveCorrect" || flag === "")} onClick={() => checkAnswer("adjective")}>Adjective</Button>
        </div>
        <progress className='' style={{ width: "30rem", height: "2rem" }} value={progress} max="100"></progress>
        <div className='row justify-content-center gap-2'>
          <h3 className='col-2'> Progress:  {progress} %</h3>
          <Button className="col-1" disabled={!isChosen} style={{ backgroundColor: "#000080" }} onClick={nextQuestion}>Next</Button>
        </div>
      </div>
    </div>
  )
}
