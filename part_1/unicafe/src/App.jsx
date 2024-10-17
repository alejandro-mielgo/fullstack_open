
import { useState } from 'react'

// components

const Button = (props) => {
  return(
    <button onClick={props.handler}>{props.name}</button>
  )
} 

const StatisticLine = ( {text, value} ) => { 
  return(
    <>
      <tr><td>{text}</td><td>{value}</td></tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral
  
  if (total === 0){
    return (
      <><p>No feedback given</p></>
    )
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={(good-bad)/total} />
            <StatisticLine text="Good" value={`${good/total} %`} />
          </tbody>
        </table>
      </>
    )
  }

}

// main application
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const handleGoodBtn = () =>{
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(total+1)
  }

  const handleNeutralBtn = () =>{
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(total+1)
  }

  const handleBadBtn = () =>{
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(total+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handler={handleGoodBtn} name="good" />
        <Button handler={handleNeutralBtn} name="neutral" />
        <Button handler={handleBadBtn} name="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App