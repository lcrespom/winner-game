import { useState } from 'react'

interface GameControlsProps {
  onStart: () => void
  onPause: () => void
  onContinue: () => void
}

const GameControls: React.FC<GameControlsProps> = ({ onStart, onPause, onContinue }) => {
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
    <div className="round-border my-4 flex w-full items-end justify-between p-2">
      <button onClick={startClicked}>{started ? 'Restart' : 'Start'}</button>
      <button onClick={pauseClicked}>
        {started ? (running ? 'Pause' : 'Continue') : 'Pause'}
      </button>
      <div>
        Speed (turns per second)
        <input type="number" className="ml-2 w-30" />
      </div>
    </div>
  )
}

/*
ToDo:
  
  - Controls
    - Start/restart button
    - Pause/continue button
    - Turns per frame input
  - Game parameters
    - Number of players input
    - Initial coins input
    - Help turns input
  - Information
    - Turn counter
    - Player counter
*/

export default GameControls
