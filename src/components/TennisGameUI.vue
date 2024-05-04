<script setup lang="ts">
import {ref} from 'vue'
import {TennisGame} from '../domain/TennisGame/tennisGame.ts';

const tennisGame = new TennisGame();

let msg = ref(tennisGame.score());

const score = (player: string) => {
  tennisGame.wonPoint(player);
  msg.value = tennisGame.score();
}
</script>
<template>
  <div class="card">
    <h1>Tennis Game</h1>
    <p>{{ msg }}</p>
    <button type="button" @click="score('player1')">Player 1</button>
    <button type="button" @click="score('player2')">Player 2</button>

  </div>
</template>
