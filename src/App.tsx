import { useState } from 'react'

import './App.css'

import GameControls from './components/game-controls'
import GameGraph from './components/game-graph'

import { normalizeGame, startGame, stepGame } from './game-engine/engine'
import type { GameParams, GameState } from './game-engine/engine'

const REFRESH_RATE = 30 // Screen updates per second

let gameParams: GameParams = {
  numPlayers: 100,
  initialCoins: 10,
  turnsPerSecond: 100_000,
  helpTurns: 0,
}

let paused = false

function updateGameParam(state: GameState, name: string, value: number) {
  return {
    ...state,
    params: { ...state.params, [name]: value },
  }
}

function App() {
  const [gameState, setGameState] = useState(() => startGame(gameParams))

  function startSimulation() {
    setGameState(startGame(gameParams))
    paused = false
    setTimeout(gameFrame, 0)
  }

  function gameFrame() {
    if (paused) return
    let refresh = true
    setGameState(state => {
      const turnsPerFrame = Math.round(state.params.turnsPerSecond / REFRESH_RATE)
      if (state.players.length == 1) refresh = false
      for (let i = 0; i < turnsPerFrame; i++) state = stepGame(state)
      return state
    })
    if (refresh) setTimeout(gameFrame, 1000 / REFRESH_RATE)
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
      <GameControls
        state={gameState}
        onStart={startSimulation}
        onPause={() => (paused = true)}
        onContinue={() => {
          paused = false
          setTimeout(gameFrame, 0)
        }}
        onParamsChange={changeParam}
      />
    </>
  )
}

export default App
