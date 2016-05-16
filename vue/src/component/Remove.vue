<template>
  <div>
    <template v-for="url in images" track-by="$index">
      <div class="squareInEdit" transition="url">
        <img :src="url" alt="" @click="remove(url)">
      </div>
    </template>
    <h1 v-if="nophoto">No photo</h1>  
  </div>
</template>

<script>

import store from '../store.js'

var imgurl = store.url

export default {
  data () {
    return {
      images: store.url,
      nophoto: false
    }
  },
  methods: {
    remove (url) {
      this.images.$remove(url)
      store.url = this.images;
      (store.url.length === 0) ? this.nophoto = true : this.nophoto = false
      console.log(store.url)
    }
  },
  route: {
    activate (transition) {
      console.log('edit activated!');
      (store.url.length === 0) ? this.nophoto = true : this.nophoto = false
      transition.next()
    },
    deactivate (transition) {
      console.log('edit deacitivate!')
      transition.next()
    }
   } 
}
</script>

<style lang="sass">
.squareInEdit{
  float: left;
  overflow: hidden;
  height: 10rem;
  width: 10rem;
  
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  
  img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
}

.url-transition {
  transition: all .3s ease;
  overflow: hidden;
}

.url-enter, .url-leave {
  height: 0;
  opacity: 0;
}  
  
</style>