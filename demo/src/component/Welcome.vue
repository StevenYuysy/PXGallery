<template>
  <div id="welcome">
    <h3>PXGallery</h3>
    <p>Showcase your photos the way they were meant to be seen.</p>
    <span class="arrow"></span>
    <button class="button" v-link="{ path: '/setting' }"> Start Now </button>
  </div>
</template>

<style lang="sass">
  #welcome {
    margin-top: -3rem;
    width: 100vw;
    height: 100vh;
    background-image: url(../lib/img/demo_1.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    text-align: center;

    h3 {
      padding: 20vh 0;
      font-size: 4rem;
    }

    .button {
      margin: 10vh 0;
      padding: 1rem;
      outline: none;
      background-color: transparent;
      font-size: 1rem;
      font-weight: bold;
      color: white;
      border-radius: 1rem;
      border: 2px white solid;
      transition: .5s ease-in-out;

      &:hover {
        background-color: white;
        color: black;
      }
    }
  }
</style>
