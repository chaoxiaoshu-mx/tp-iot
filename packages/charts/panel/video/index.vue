<template>
  <div class="video-container">
    <div class="player-item">
<!--      <VTcPlayer class="tc-player" ref="tcPlayer" :options="options" elmId="1" @click="handleClick"/>-->
    </div>
  </div>
</template>

<script>
// import { VTcPlayer } from 'v-tcplayer'
export default {
  name: "VideoPanel",
  components:{
    // VTcPlayer
  },
  data() {
    return {
      options: { width: '100%', height:'100%'},
    }
  },
  methods: {
    handleClick() {
      console.log("====c")
    }
  }
}
</script>

<style scoped>
.video-container {
  width: 1000px;
}
.player-item {
  width: 300px;
  height: 300px;
  padding: 30px
}
.tc-player {
  width: 240px;
  height: 240px;
}
</style>