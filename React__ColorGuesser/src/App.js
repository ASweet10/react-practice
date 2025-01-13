import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const colorArray = ['#FFFF84', '#80FFFF', '#0FFFF4']
  const [color, setColor] = useState("#01FF84")
  const [answers, setAnswers] = useState(colorArray)
  const [answerCorrect, setAnswerCorrect] = useState()

  //Functions, but inefficient
  const GetRandomColor = () => {
    const n = 6
    const hexaDecimalValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    let randomValues = hexaDecimalValues.sort(() => 0.5 - Math.random()).slice(0, n)
    return '#' + randomValues[0] + randomValues[1] + randomValues[2] + randomValues[3] + randomValues[4] + randomValues[5]
  }

  function getRandomNumberString(){
    const maxValue = Math.pow(16, 6) //Math.pow(x, y) = x^y
    const decimalValue = Math.floor(Math.random() * maxValue)
    //toString(base 16 / hexadecimal)
    // padStart adds values to end of string until reaches desired amount (6)
    const hexString = decimalValue.toString(16).padStart(6, '0')

    return '#' + hexString
  }
  
  const HandleButtonClick = (answer) => {
    console.log(answer)
    if(answer === color){
      setAnswerCorrect(true)
      GenerateColors()
    }
    else {
      setAnswerCorrect(false)
    }
  }

  const GenerateColors = () => {
    const correctColor = getRandomNumberString()
    const checkColor = getRandomNumberString()
    console.log('check' + checkColor)
    setColor(correctColor)
    setAnswers([correctColor, getRandomNumberString(), getRandomNumberString()]
      .sort(
        () => 0.5 - Math.random() //Math.random returns value 0-1
      ))
    console.log(answers)
    setAnswerCorrect(null)
  }

  useEffect(() => {
    GenerateColors()
  }, [])  

  return (
    <div className="App">
       {/*Column layout*/}
      <div className='col'>
        {/* Pass color to background for guessing square */}
        <div className='guess-color-square' style={{background: color}}></div>
        
        <div>
          {/* Map only works on array; Validate with console.log */}
          {answers.map(answer => {
            //Don't forget return when mapping
            // onClick must pass HandleButtonClick with arrow function or "too many re-renders" from useEffect
            return <button value={answer} key={answer} onClick={() => HandleButtonClick(answer)}>{answer}</button>
          })}
        </div>

        {/* Conditional divs, only output if answerCorrect != null */}
        {answerCorrect === true && <div className='correct'>You win!</div>}
        {answerCorrect === false && <div className='incorrect'>Wrong answer!</div>}

      </div>
    </div>
  );
}

export default App;
