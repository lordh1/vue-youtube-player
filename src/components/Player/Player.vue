<template>
  <div class="player">
    <h1>Youtube Player</h1>
    <p><strong v-if="getCurrentVideo">Currently playing:</strong> {{getCurrentVideo}}</p>
    <div class="screen">
      <youtube :video-id="videoId" ref="youtube" @ended="playNextVideo()" :player-vars="playerVars" :width="width" :height="height"></youtube>
    </div>
    <div>
      <input type="text" v-model="newUrl" name="newUrl" placeholder="please paste Youtube video url here" />
      <p v-show="showValidationErrors" class="error">This video url is invalid!</p>
    </div>
    <div>
      <button class="add-button" @click="addVideo()">Add</button>
      <button class="clear-button" @click="clearUrl()">Clear</button>
    </div>
    <div class="items">
      <div v-for="(item, index) in getVideos" :key="index" :class="getCurrentVideo === item ? 'item item-is-playing' : 'item'">
        <span @click="playVideo(item)"><fa :icon="faPlay" /> {{item}}</span><span class="remove-icon" @click="removeVideo(item)"><fa :icon="faTrashAlt" /></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Fa from 'vue-fa'
import { faPlay, faPause, faRedo, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Player',
  components: { Fa },
  data () {
    return {
      touched: false,
      newUrl: null,
      videoId: '',
      playerVars: {
        autoplay: 1
      },
      faPlay,
      faPause,
      faRedo,
      faTrashAlt,
      showValidationErrors: false,
      width: '100%',
      height: '100%'
    }
  },
  methods: {
    clearUrl () {
      this.newUrl = null
    },
    addVideo () {
      if (this.validate(this.newUrl)) {
        this.setNewVideo(this.newUrl)
        this.clearUrl()
      }
    },
    playVideo (item) {
      let id = this.$youtube.getIdFromUrl(item)
      this.videoId = id
      this.player.playVideo()
      this.setCurrentVideo(item)
    },
    playNextVideo () {
      let nextVideo = this.getNextVideo
      let id = this.$youtube.getIdFromUrl(nextVideo)
      this.videoId = id
      this.player.playVideo()
      this.setCurrentVideo(nextVideo)
    },
    removeVideo (item) {
      this.setRemoveVideo(item)
    },
    validate (item) {
      let val = this.$youtube.getIdFromUrl(item)
      if (!val) this.showValidationErrors = true
      return val
    },
    ...mapMutations([
      'setNewVideo', 'setRemoveVideo', 'setCurrentVideo'
    ])
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    },
    ...mapGetters([
      'getVideos', 'getCurrentVideo', 'getNextVideo'
    ])
  },
  watch: {
    showValidationErrors () {
      setTimeout(() => { this.showValidationErrors = false }, 3000)
    }
  },
  created () {
    setTimeout(() => { this.playNextVideo() }, 1000)
  }
}
</script>

<style scoped>
  .screen {
    width: 640px;
    height: 360px;
  }

  div {
    padding-bottom: 10px;
  }

  input {
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    border: 1px solid black;
    width: 100%;
    font-size: 1em;
    padding: 5px;
  }

  button {
    font-size: 20px;
    border: 1px solid black;
    width: 100px;
    height: 50px;
    outline: none;
  }

  button:hover {
    cursor: pointer;
  }

  .add-button {
    background-color: dodgerblue;
  }

  .add-button:hover {
    background-color: #1b488f;
  }

  .clear-button {
    background-color: #FF0000;
  }

  .clear-button:hover {
    background-color: #760100;
  }

  .item {
    margin-bottom: 5px;
    padding: 5px;
  }

  .item:hover {
    cursor: pointer;
    background-color: #aecfff;
  }

  .item-is-playing {
    background-color: #ffe007;
  }

  .remove-icon {
    float: right;
    color: #000000;
  }

  .remove-icon:hover {
    color: #ff0000;
  }

  .error {
    color: #ff0000;
  }

  @media only screen and (max-width: 660px) {
    .player {
      width: 95%;
    }

    .screen {
      width: 100%;
      height: 200px;
      margin-bottom: 20px;
    }

    .item {
      margin-bottom: 20px;
    }

    button {
      margin: 20px
    }

    .add-button {
      float: left;
    }

    .clear-button {
      float: right;
    }

    .items {
      clear: both;
    }
  }
</style>
