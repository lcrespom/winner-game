# Competitive Exclusion

## Introduction

The famous [Thinking in Systems](https://en.wikipedia.org/wiki/Thinking_In_Systems:_A_Primer) book
describes the system trap _Success to the Successful — Competitive Exclusion_, which occurs when
initial success gives one actor an advantage that leads to further success, while others fall
behind, eventually being excluded. This feedback loop amplifies inequality and reduces diversity and
competition.

This is a small simulation game that demonstrates the dynamics of this system trap. The game begins
with a fixed number of players, each having the same amount of coins. On each turn, each player is
randomly paired with another player and bet one coin each. The winner is radomly selected and keeps
the two coins. The game iterates turns until only one player remains.

The game shows a bar graph with the amount of coins each player has as the game progresses. The user
can control the game parameters, such as the initial number of coins, the turns per second, etc., to
see how different game conditions affect the behavior of the simulation.

## Setup

This is a plain client-side Vite-React project. It can be built and tested with `node.js` or a
compatible runtime. As usual:

- Initial installation: `npm install`.
- Run in development mode: `npm run dev`.
