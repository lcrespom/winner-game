import './App.css'
import { startGame, stepGame, normalizeGame } from './game-engine/engine'
import GameGraph from './components/game-graph'
import { useState } from 'react'
import GameControls from './components/game-controls'

const TURNS_PER_FRAME = 1000

function App() {
  const [gameState, setGameState] = useState(() => startGame())

  function startSimulation() {
    setGameState(startGame())
    requestAnimationFrame(gameFrame)
  }

  function gameFrame() {
    let refresh = true
    setGameState(state => {
      if (state.players.length == 1) refresh = false
      for (let i = 0; i < TURNS_PER_FRAME; i++) {
        state = stepGame(state)
      }
      return state
    })
    if (refresh) requestAnimationFrame(gameFrame)
  }

  return (
    <>
      <h1>Success to the Successful — Competitive Exclusion</h1>
      <GameGraph state={normalizeGame(gameState)} />
      <GameControls onStart={startSimulation} />
    </>
  )
}

export default App
