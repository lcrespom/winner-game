import './App.css'
import { startGame, stepGame } from './game-engine/engine'

function startSimulation() {
  console.log('TODO: simulate')
  let state = startGame()
  let i = 0
  do {
    i++
    state = stepGame(state)
    console.log(`Step: ${i} - players: ${state.players.length}`)
  } while (state.players.length > 1)
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
