import { useState } from 'react'

import type { GameState } from '../game-engine/engine'

interface GameControlsProps {
  state: GameState
  onStart: () => void
  onPause: () => void
  onContinue: () => void
  onParamsChange: (name: string, value: number) => void
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
    onStart()
  }

  function pauseClicked() {
    setRunning(running => {
      running = !running
      if (running) onPause()
      else onContinue()
      return running
    })
  }

  return (
    <div className="round-border relative my-4 w-full p-2">
      <button className="absolute left-2" onClick={startClicked}>
        {started ? 'Restart' : 'Start'}
      </button>
      <button className="absolute left-1/2 -translate-x-1/2" onClick={pauseClicked}>
        {started ? (running ? 'Pause' : 'Continue') : 'Pause'}
      </button>
      <div className="absolute right-2">
        Speed (turns per second)
        <input
          type="number"
          className="ml-2 w-30"
          value={state.params.turnsPerSecond}
          onChange={e => onParamsChange('turnsPerSecond', parseInt(e.target.value))}
        />
      </div>
      <button className="invisible">Center</button> {/* ensures container grows */}
    </div>
  )
}

/*
  - Controls
    - [x] Start/restart button
    - [x] Pause/continue button
    - [x] Turns per frame input
  - Game parameters
    - [ ] Number of players input
    - [ ] Initial coins input
    - [ ] Help turns input
  - Information
    - [ ] Turn counter
    - [ ] Player counter
*/

export default GameControls
