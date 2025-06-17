import './App.css'
import { startGame, stepGame, normalizeGame } from './game-engine/engine'
import GameGraph from './components/game-graph'
import { useState } from 'react'

const TURNS_PER_FRAME = 1000

function App() {
  const [gameState, setGameState] = useState(startGame())

  function startSimulation() {
    requestAnimationFrame(gameFrame)
  }

  function gameFrame() {
    let tmpState = gameState
    for (let i = 0; i < TURNS_PER_FRAME; i++) {
      tmpState = stepGame(tmpState)
    }
    setGameState(normalizeGame(tmpState))
    requestAnimationFrame(gameFrame)
  }

  return (
    <>
      <h1>Test</h1>
      <GameGraph state={gameState} />
      <button onClick={startSimulation}>
        {gameState.turn == 0 ? 'Start Game' : 'Stop Game (ToDo)'}
      </button>
    </>
  )
}

export default App
