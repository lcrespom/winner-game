import './App.css'
import { startGame, stepGame, normalizeGame } from './game-engine/engine'
import GameGraph from './components/game-graph'
import { useState } from 'react'

const TURNS_PER_FRAME = 100

function App() {
  const [gameState, setGameState] = useState(() => startGame())

  function startSimulation() {
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
      <h1>Test</h1>
      <GameGraph state={normalizeGame(gameState)} />
      <button onClick={startSimulation}>
        {gameState.turn == 0 ? 'Start Game' : 'Pause Game'}
      </button>
    </>
  )
}

export default App
