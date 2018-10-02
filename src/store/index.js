import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [
      'https://youtu.be/fctMc6SxVFY',
      'https://www.youtube.com/watch?v=JkhzwBfekFs',
      'https://www.youtube.com/watch?v=9aQtZ_vqimA'
    ],
    currentVideo: null
  },
  getters: {
    getVideos: state => {
      return state.videos
    },
    getCurrentVideo: state => {
      return state.currentVideo
    },
    getNextVideo: state => {
      let nextIndex
      if (state.currentVideo) {
        let currentIndex = state.videos.indexOf(state.currentVideo)
        nextIndex = currentIndex + 1
        if (nextIndex === state.videos.length) nextIndex = 0
      } else nextIndex = 0

      return state.videos[nextIndex]
    }
  },
  mutations: {
    setNewVideo (state, val) {
      if (!state.videos.includes(val)) state.videos = [...state.videos, val]
    },
    setRemoveVideo (state, val) {
      console.log(val)
      state.videos = state.videos.filter((item) => { return item !== val })
    },
    setCurrentVideo (state, val) {
      state.currentVideo = val
    }
  }
})
