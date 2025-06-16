import { startGame, stepGame, type GameState } from '../src/game-engine/engine.ts'

const NUM_PLAYERS = 100
const INITIAL_MONEY = 100
const HELP_TURNS = 90

function runSimulation() {
  const NumFmt = Intl.NumberFormat()
  let state = startGame(NUM_PLAYERS, INITIAL_MONEY)
  let i = 0
  let players = 0
  let helpct = HELP_TURNS
  do {
    i++
    state = stepGame(state)
    helpct--
    if (HELP_TURNS > 0 && helpct == 0) {
      helpEverybody(state)
      helpct = HELP_TURNS
    }
    if (players != state.players.length || i % 1_000_000 == 0) {
      players = state.players.length
      console.log(`Step: ${NumFmt.format(i)} - players: ${state.players.length}`)
    }
  } while (state.players.length > 1)
}

function helpEverybody(state: GameState) {
  for (const player of state.players) {
    player.coins++
  }
}

runSimulation()
