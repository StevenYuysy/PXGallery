<template>
  <div id="setting">
    <div class="setting">
        <ul>
          <li>Current layout:  {{ currentLayout }}</li>
          <li>Total: {{ totalNumber}}</li>
          <li>Gutter: {{ gutter }} <br> <input type="range" min="0" max="100" v-model="gutter" @mouseup="sendGutter"> </li>
          <li class="select">Fullscreen: {{fullscreen}} <br>
            <select v-model="fullscreen" @click="setFullscreen">
              <option selected value=true>true</option>
              <option value=false >false</option>  
            </select>
          </li>
          <li class="addphoto">
            <input type="text" v-model="photoUrl">
            <button @click="add">add photo</button> 
          </li>
          <li v-if="puzzle">Current height of container: {{ puzzleHeight }}
            <input type="range" min="100" max="800" v-model="puzzleHeight" @mouseup="sendPuzzleHeight">
          </li>
          <li v-if="waterfall">Current index of the column with minimun height: {{ columnMinHeight }}</li>
          <li v-if="waterfall">Current columns: {{ column }} 
            <input type="range" min="1" max="8" v-model="column" @mouseup="sendColumn">
          </li>
          <li v-if="barrel">Cuurent setting minimun height of the row: {{ rowMinHeight }}
            <input type="range" min="100" max="800" v-model="rowMinHeight" @mouseup="sendRowMinHeight">
          </li>
          <li v-if="square">A box space (1-12) when over 769px: {{ mdSquareSize }}
            <input type="range" min="1" max="6" v-model="mdSquareSize" @mouseup="sendMdSquareSize">
          </li>
          <li v-if="square">A box space (1-12) when under 768px: {{ smSquareSize }}
            <input type="range" min="1" max="6" v-model="smSquareSize" @mouseup="sendSmSquareSize">
          </li>
        </ul> 
    </div>
    <div class="option">
      <ul>
        <li v-show="puzzleAble" @click="setLayout(1)">Puzzle</li>
        <li @click="setLayout(2)">Waterfall</li>
        <li @click="setLayout(3)">Barrel</li>
        <li @click="setLayout(4)">Square</li>
      </ul>
    </div>
  </div>
</template>


<script>
import pxgallery from '../lib/pxgallery.js'
import store from '../store.js'

var gallery

var setting = function(tobetrue) {
  var self = this;
  var layout = ['puzzle', 'waterfall', 'barrel', 'square'];
  layout.forEach(function(ele) {
    self.$set(ele, false)
  })
  this.$set(tobetrue, true)
}

var addRandom = function() {
  var urlBase = 'http://placehold.it/';
  var width = parseInt(Math.random() * 1000) + 500;
  var height = parseInt(Math.random() * 1000) + 500;
  var color = ['/E97452','/4C6EB4','/449F93','/936FBC','/D25064','/CF364A'];
  var i = Math.floor(Math.random() * 6);
  var url = urlBase + width + 'x' + height + color[i] + '/fff';
  return url
}

export default {
  data () {
    return {
      currentLayout:    store.options.layout,
      totalNumber:      store.url.length,
      gutter:           store.options.gutter,
      fullscreen:       store.options.fullscreenState,
      puzzleHeight:     store.options.puzzleHeight,
      column:           store.options.column,
      columnMinHeight:  store.options.columnMinHeight,
      rowMinHeight:     store.options.heightMin,
      mdSquareSize:     store.options.mdSquareSize,
      smSquareSize:     store.options.smSquareSize,
      puzzle:           false,
      waterfall:        false,
      barrel:           false,
      square:           true,
      photoUrl:         'http://placehold.it/1300x1200/CF364A/fff'
    }
  },
  methods: {
    setLayout (num) {
      store.options.layout = num;
      gallery.setLayout(num);
      this.$set('currentLayout', num)
      switch (num) {
        case 1:
        setting.call(this, 'puzzle')
        break
        case 2:
        this.$set('columnMinHeight', gallery.getWaterfallHeightMin())
        setting.call(this, 'waterfall')
        break
        case 3:
        setting.call(this, 'barrel')
        break
        case 4:
        setting.call(this, 'square')
        break
        default:
        setting.call(this, '')
      }
    },
    sendGutter () {
      store.options.gutter = this.gutter
      gallery.setGutter(this.gutter)
      gallery.setLayout(this.currentLayout)
    },
    setFullscreen() {
      (this.fullscreen === 'true') ? gallery.enableFullscreen() : gallery.disableFullscreen()
    },
    add () {
      if ((this.currentLayout === 1 )&& (this.totalNumber ===6)) this.setLayout(4) 
      if (this.photoUrl.trim()) {
        store.url.push(this.photoUrl)
        gallery.addImage(this.photoUrl)
        this.$set('totalNumber', store.url.length)
        this.photoUrl = addRandom();
        if (gallery.columns) this.$set('columnMinHeight', gallery.getWaterfallHeightMin())
        if (this.currentLayout === 3) this.setLayout(3)
      }
    },
    sendPuzzleHeight () {
      store.options.puzzleHeight = this.puzzleHeight
      gallery.setPuzzleHeight(this.puzzleHeight)
    },
    sendColumn () {
      store.options.column = this.column
      gallery.setColumnNum(this.column)
      this.$set('columnMinHeight', gallery.getWaterfallHeightMin())
    },
    sendRowMinHeight () {
      store.options.rowMinHeight = this.rowMinHeight
      gallery.setBarrelHeight(this.rowMinHeight)
    },
    sendMdSquareSize () {
      store.options.mdSquareSize = this.mdSquareSize
      gallery.setMdSquareSize(this.mdSquareSize)
    },
    sendSmSquareSize () {
      store.options.smSquareSize = this.smSquareSize
      gallery.setSmSquareSize(this.smSquareSize)
    }
    
  },
  computed: {
    puzzleAble () {
      return this.totalNumber <= 6
    }
  },
  route: {
    activate (transition) {
      gallery = new pxgallery();
      gallery.setImage(store.url,
      {
        layout:         store.options.layout,
        puzzleHeight:   store.options.puzzleHeight,
        column:         store.options.column,
        heightMin:      store.options.heightMin,
        gutter:         store.options.gutter,
        mdSquareSize:   store.options.mdSquareSize,
        smSquareSize:   store.options.smSquareSize
      })
      this.totalNumber = store.url.length 
      transition.next()
    },
    deactivate (transition) {
      gallery.clearLayout()
      gallery.removeImage(gallery.getImageDomElements())
      transition.next()
    }
  } 
}
</script>

<style lang="sass">
  @import '../variable.scss';
  .setting{
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    width: 10rem;
    overflow: hidden;
    background-color: $white;
    box-shadow: 0 1rem 0.5rem 1rem $dark_gray;
    
    ul {
      
      li {
        list-style: none;
        padding: 1rem;
        border-bottom: 1px solid $bg_gray;
        
        &.select {
          select {
            width: 8rem;
            margin-top: 1rem;
            outline: none;
            border: none;
            background-color: $white;
            box-shadow:  0 0 1rem $dark_gray;
          }
        }
        
        &.addphoto {
          
          input {
            width: 8rem;
            margin-bottom: 1rem;
          }
          
          button {
            width: 8rem;
            outline: none;
            border: none;
            background-color: $white;
            box-shadow:  0 0 1rem $dark_gray;
            cursor: pointer;
            @include hover;
            
            &:hover {
              color: $white;
              background-color: $light_blue;
            }
          }
        }
      }
    }
  }
  .option {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 10rem;
    width: 10rem;
    overflow: hidden;
    background-color: $white;
    box-shadow:  0 0 1rem  $dark_gray;
    
    ul {
      
      li {
        list-style: none;
        padding: 1rem;
        border-bottom: 1px solid $bg_gray;
        cursor: pointer;
        @include hover;
        
        &:hover {
          color: $white;
          background-color: $light_blue;
        }
      }
    }
  }
</style>


