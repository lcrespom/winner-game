import { GameParams, GameState, startGame, stepGame } from '../src/game-engine/engine.ts'

const HELP_TURNS = 90

const params: GameParams = {
  numPlayers: 100,
  initialCoins: 100,
  turnsPerSecond: 100_000,
  helpTurns: 0,
}

function runSimulation() {
  const NumFmt = Intl.NumberFormat()
  let state = startGame(params)
  let players = 0
  let helpct = HELP_TURNS
  do {
    state = stepGame(state)
    helpct--
    if (HELP_TURNS > 0 && helpct == 0) {
      helpEverybody(state)
      helpct = HELP_TURNS
    }
    if (players != state.players.length || state.turn % 1_000_000 == 0) {
      players = state.players.length
      console.log(`Step: ${NumFmt.format(state.turn)} - players: ${state.players.length}`)
    }
  } while (state.players.length > 1)
}

function helpEverybody(state: GameState) {
  for (const player of state.players) {
    player.coins++
  }
}

runSimulation()
