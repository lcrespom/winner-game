import { useState } from 'react'

import './App.css'

import GameControls from './components/game-controls'
import GameGraph from './components/game-graph'

import { normalizeGame, startGame, stepGame, type GameParams } from './game-engine/engine'

const REFRESH_RATE = 30 // Screen updates per second

const gameParams: GameParams = {
  numPlayers: 100,
  initialCoins: 10,
  turnsPerSecond: 100_000,
  helpTurns: 100,
}

function doNothing() {}

function App() {
  const [gameState, setGameState] = useState(() => startGame(gameParams))

  function startSimulation() {
    setGameState(startGame(gameParams))
    setTimeout(gameFrame, 0)
  }

  function gameFrame() {
    let refresh = true
    const turnsPerFrame = Math.round(gameParams.turnsPerSecond / REFRESH_RATE)
    setGameState(state => {
      if (state.players.length == 1) refresh = false
      for (let i = 0; i < turnsPerFrame; i++) state = stepGame(state)
      return state
    })
    if (refresh) setTimeout(gameFrame, 1000 / REFRESH_RATE)
  }

  return (
    <>
      <h1>Success to the Successful — Competitive Exclusion</h1>
      <GameGraph state={normalizeGame(gameState)} />
      <GameControls
        onStart={startSimulation}
        onPause={doNothing}
        onContinue={doNothing}
      />
    </>
  )
}

export default App
