<template>
 <div id="wrapper"  @click="cancelMenu">
  <header>
    <svg class="menuSvg" @click.stop="toggleMenu">
      <path d="M3,18h18v-2H3V18z M3,13h18v-2H3V13z M3,6v2h18V6H3z"></path>
    </svg> 
    <span><a href="">PXGallery with vue.js</a></span>
    <div class="menu" v-show="menuState" transition="menu">
      <ul>
        <li><a v-link="{ path: '/setting' }">Setting</a></li>
        <li><a v-link="{ path: '/remove' }">Remove photo</a></li>
        <li><a href="">My gallery</a></li>  
        <li><a href="">About</a></li>
      </ul>  
    </div>
  </header>  
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  <div class="pxgalleryContainer"></div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        menuState: false,
      }
    },
    methods: {
      toggleMenu() {
        this.menuState = true;
      },
      cancelMenu() {
        this.menuState = false;
      }
    }
  }
</script>

<style lang="sass">
 @import '../lib/pxgallery.scss';
 @import '../reset.scss';
 @import '../variable.scss';

#wrapper {
  overflow: hidden;
} 
header {
  font-size: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid $bg_gray;
  margin-bottom: 3rem;
  text-align: center;
  
  a {
    text-decoration: none;
    color: $black;
  }
  
  .menuSvg {
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 3rem;
    cursor: pointer;
  }
  
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index:10;
    width: 10rem;
    height: 100%;
    background-color:  $white;
    box-shadow: 1rem 1rem 0.5rem $dark_gray;
    
    ul {
      
      li {
        list-style: none;
        border-bottom: 1px solid $bg_gray;
        
        a {
          display: block;
          color: $black;
          text-decoration: none;
          font-size: 1rem;
          padding: 1rem;
          @include hover;
        
          &:hover {
            color: $white;
            background-color: $light_blue;
          }
        }   
      }
    }
  }

.menu-transition {
  transition: all .3s ease;
  overflow: hidden;
}

.menu-enter, .menu-leave {
  width: 0;
  opacity: 0;
}  


}
</style>


