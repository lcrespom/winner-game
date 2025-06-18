import { useState } from 'react'

interface GameControlsProps {
  onStart: () => void
}

const GameControls: React.FC<GameControlsProps> = ({ onStart }) => {
  const [running, setRunning] = useState(false)

  function startClicked() {
    setRunning(true)
    onStart()
  }

  return (
    <div className="round-border my-4 flex w-full items-end p-2">
      <button onClick={startClicked}>{running ? 'Restart' : 'Start'}</button>
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
