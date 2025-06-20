import { useState } from 'react'

import type { GameParams, GameState } from '../game-engine/engine'

type GameControlsProps = {
  state: GameState
  onStart: () => void
  onPause: () => void
  onContinue: () => void
  onParamsChange: (name: keyof GameParams, value: number) => void
}

const NumFmt = Intl.NumberFormat()

let initialTime = 0
let pauseStartTime = 0
let pausedTime = 0

function getCurrentTime() {
  if (initialTime == 0) return ''
  const elapsedTimeMs = new Date().getTime() - initialTime - pausedTime
  return new Date(elapsedTimeMs).toISOString().slice(14, 19)
}

const GameControls: React.FC<GameControlsProps> = ({
  state,
  onStart,
  onPause,
  onContinue,
  onParamsChange,
}) => {
  const [started, setStarted] = useState(false)
  const [running, setRunning] = useState(false)

  function startClicked() {
    setStarted(true)
    setRunning(true)
    initialTime = new Date().getTime()
    pauseStartTime = 0
    pausedTime = 0
    onStart()
  }

  function pauseClicked() {
    //TODO account for paused time
    setRunning(running => {
      running = !running
      const now = new Date().getTime()
      if (running) {
        if (pauseStartTime != 0) pausedTime += now - pauseStartTime
        pauseStartTime = 0
        onContinue()
      } else {
        pauseStartTime = now
        onPause()
      }
      return running
    })
  }

  const getParamInputProps = (propName: keyof GameParams) => ({
    type: 'number',
    value: state.params[propName],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onParamsChange(propName, parseInt(e.target.value)),
  })

  return (
    <div className="round-border my-4 w-full p-2">
      {/*---------- First row: game controls ----------*/}
      <div className="relative">
        <button className="absolute left-2" onClick={startClicked}>
          {started ? 'Restart' : 'Start'}
        </button>
        <button
          className="absolute left-1/2 -translate-x-1/2"
          disabled={!started}
          onClick={pauseClicked}
        >
          {started ? (running ? 'Pause' : 'Continue') : 'Pause'}
        </button>
        <div className="absolute right-2">
          Speed (turns per second)
          <input className="ml-2 w-30" {...getParamInputProps('turnsPerSecond')} />
        </div>
        <button className="invisible">X</button> {/* ensures container grows */}
      </div>
      {/*---------- Second row: game information ----------*/}
      <div className="relative mt-4">
        <div className="absolute left-2">
          <b>Turn</b>: {NumFmt.format(state.turn)}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <b>Time</b>: {getCurrentTime()}
        </div>
        <div className="absolute right-2">
          <b>Players</b>: {NumFmt.format(state.players.length)}
        </div>
        <div className="invisible">X</div> {/* ensures container grows */}
      </div>
      {/*---------- Third row: game parameters ----------*/}
      <div className="relative mt-4">
        <div className="absolute left-2">
          Number of players
          <input className="ml-2 w-22" {...getParamInputProps('numPlayers')} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          Initial coins
          <input className="ml-2 w-20" {...getParamInputProps('initialCoins')} />
        </div>
        <div className="absolute right-2">
          Help every
          <input className="mr-2 ml-2 w-20" {...getParamInputProps('helpTurns')} />
          turns
        </div>
        <button className="invisible">X</button> {/* ensures container grows */}
      </div>
    </div>
  )
}

export default GameControls
