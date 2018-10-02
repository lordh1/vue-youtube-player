<template>
  <div id="app">
    <Player />
  </div>
</template>

<script>
import Player from './components/Player/Player'

export default {
  name: 'App',
  components: {Player}
}
</script>

<style scoped>
  div {
    margin-left: auto;
    margin-right: auto;
    width: 640px;
  }

  @media only screen and (max-width: 660px) {
    div {
      width: 95%;
    }

  }
</style>
