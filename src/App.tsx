import { useState } from 'react'

import GameControls from './components/game-controls'
import GameGraph from './components/game-graph'

import { normalizeGame, startGame, stepGame } from './game-engine/engine'
import type { GameParams, GameState } from './game-engine/engine'
import GameHistory from './components/game-history'

const REFRESH_RATE = 30 // Screen updates per second

let gameParams: GameParams = {
  numPlayers: 100,
  initialCoins: 10,
  turnsPerSecond: 1_000,
  helpTurns: 0,
}

let paused = false

let tickHandler = () => {}

setInterval(() => tickHandler(), 1000 / REFRESH_RATE)

function updateGameParam(state: GameState, name: string, value: number) {
  return {
    ...state,
    params: { ...state.params, [name]: value },
  }
}

function gameFrameSteps(state: GameState) {
  // Check if game over
  if (state.players.length <= 1) {
    paused = true
    return state
  }
  // Run the allocated game steps for the current frame
  const turnsPerFrame = Math.round(state.params.turnsPerSecond / REFRESH_RATE)
  for (let i = 0; i < turnsPerFrame; i++) state = stepGame(state)
  return state
}

function App() {
  const [gameState, setGameState] = useState(() => startGame(gameParams))

  function startSimulation() {
    setGameState(startGame(gameParams))
    paused = false
    tickHandler = gameFrame
  }

  function gameFrame() {
    if (paused) return
    let done = false
    setGameState(state => {
      // Workaround to avoid double invocation in development mode
      if (done) return state
      done = true
      // Run a chunk of game steps
      return gameFrameSteps(state)
    })
  }

  function changeParam(name: string, value: number) {
    setGameState(state => {
      const newState = updateGameParam(state, name, value)
      gameParams = newState.params
      return newState
    })
  }

  return (
    <>
      <h1>Success to the Successful — Competitive Exclusion</h1>
      <GameGraph state={normalizeGame(gameState)} />
      <GameHistory state={gameState} />
      <GameControls
        state={gameState}
        onStart={startSimulation}
        onPause={() => (paused = true)}
        onContinue={() => (paused = false)}
        onParamsChange={changeParam}
      />
    </>
  )
}

export default App
