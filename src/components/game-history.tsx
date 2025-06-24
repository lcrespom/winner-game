import React, { useEffect, useRef } from 'react'
import { type GameState } from '../game-engine/engine'

function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  // set the internal bitmap size to (css size × DPR)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  // Set (0,0) at bottom left
  ctx.setTransform(1, 0, 0, -1, 0, canvas.height)
  // optional: clear / redraw here
  ctx.clearRect(0, 0, width, height)
}

function updateCanvas(canvas: HTMLCanvasElement, state: GameState) {
  const { history } = state
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  resizeCanvas(canvas, ctx)
  ctx.fillStyle = '#155dfc' // bg-blue-600 in Tailwind
  const { width, height } = ctx.canvas
  let historyPos = 0
  let turn = 0
  let turnInc = state.turn / width
  if (turnInc < 1) turnInc = 1
  let population = state.params.numPlayers
  for (let x = 0; x < width; x++) {
    while (historyPos < history.length && history[historyPos].turn < turn) historyPos++
    if (historyPos < history.length) population = history[historyPos].population
    if (turnInc == 1 && historyPos >= history.length) break
    const barHeight = (population / state.params.numPlayers) * height
    ctx.fillRect(x, 0, 1, barHeight)
    turn += turnInc
  }
}

export const GameHistory: React.FC<{ state: GameState }> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) updateCanvas(canvasRef.current, state)
  }, [state])

  return (
    <div className="round-border relative box-border flex h-[208px] w-full p-1">
      <div className="text-ring absolute top-1 right-1/2 translate-x-1/2 text-sm text-gray-500">
        Population / turn
      </div>
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  )
}

export default GameHistory
