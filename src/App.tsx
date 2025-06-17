import './App.css'
import { startGame, stepGame, normalizeGame } from './game-engine/engine'
import GameGraph from './components/game-graph'
import { useState } from 'react'

const TURNS_PER_FRAME = 1000

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
      <h1>Success to the Successful — Competitive Exclusion</h1>
      <GameGraph state={normalizeGame(gameState)} />
      <button onClick={startSimulation}>
        {gameState.turn == 0 ? 'Start Game' : 'Pause Game'}
      </button>
    </>
  )
}

/*
ToDo:
  
  - Controls
    - Start/restart button
    - Pause/continue button
    - Turns per frame slider
  - Data input
    - Number of players
    - Initial coins
    - Help turns (with hover)
  - Information
    - Turn counter
    - Player counter
*/

export default App
