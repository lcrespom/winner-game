import './App.css'
import { startGame, stepGame } from './game-engine/engine'

function startSimulation() {
  console.log('TODO: simulate')
  let state = startGame()
  for (let i = 0; i < 100; i++) {
    state = stepGame(state)
    console.dir(state)
  }
}

function App() {
  return (
    <>
      <h1>Test</h1>
      <p>Hello</p>
      <button onClick={startSimulation}>Start simulation</button>
    </>
  )
}

export default App
