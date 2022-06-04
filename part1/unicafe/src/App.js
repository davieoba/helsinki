import './App.css';
import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr><td>{text}</td><td>{value}</td><td>{text === 'Positive' ? '%' : ''}</td></tr>
    </>
  )
}

const Statistics = ({ props }) => {
  const obj = {
    all: props.good + props.neutral + props.bad,
    average: ((props.good + props.bad + props.neutral) / 3).toFixed(1),
    positive: (props.good / (props.good + props.neutral + props.bad) * 100).toFixed(1)
  }

  function render() {
    if (obj.all <= 0) {
      return <>No Feedback given</>
    } else {
      return <>
        <h3>Statistics</h3>
        <table>
          <tbody>
            <StatisticsLine text='Good' value={props.good} />
            <StatisticsLine text='Neutral' value={props.neutral} />
            <StatisticsLine text='Bad' value={props.bad} />
            <StatisticsLine text='All' value={obj.all} />
            <StatisticsLine text='Average' value={obj.average} />
            <StatisticsLine text='Positive' value={obj.positive} />
          </tbody>
        </table>
      </>
    }
  }

  return (
    <>
      <div>
        {render()}
      </div>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGood() {
    setGood(prev => prev + 1)


  }

  function handleBad() {
    setBad(prev => prev + 1)

  }

  function handleNeutral() {
    setNeutral(prev => prev + 1)

  }

  return (
    <div className="App">
      <h1>Give Feedback </h1>

      <div className='btn_container'>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
      </div>

      <Statistics props={{ good, neutral, bad }} />
    </div>
  );
}

export default App;
