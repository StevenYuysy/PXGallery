# Description

PXGallery is a library which can set different layouts in pure javascript without any dependencies. 

# Demo

[Demo](http://heyjax.github.io/demo/stage_4/vue/index.html#!/)

# Setup

## Easy setup
Commonly, you can just install it with a css and javascript:

```
<link rel="stylesheet" href="css/pxgallery.min.css">
```

Include the Gallery script at the bottom of the body of your webpage:

```
<script src="js/pxgallery.js">
```

And then, set the image and the layouts:

```
var pxgallery = new pxgallery();
pxgallery.setImage([
    "http://placehold.it/1300x1600/E97452/fff",
    "http://placehold.it/1300x1300/4C6EB4/fff",
    "http://placehold.it/1300x1250/449F93/fff",
    "http://placehold.it/800x400/936FBC/fff",
    "http://placehold.it/1000x500/D25064/fff"
],
{
    layout: 4,
    fullscreenState: true,
});

```

## Module setup

You can also use module to include the library just like the demo above, here are some examples:

ES 6
```
import pxgallery from 'lib/pxgallery.js'
```

AMD

```
requirejs(['pxgallery'], function( pxgallery ) {
    // some code here
});
```

# Options

Here are defalut options:

When new an object:

```
var pxgallery = new pxgallery({
  containerSelector:  '.pxgalleryContainer',
  fullscreenSelector: '.pxfullscreen',
  boxSelector:        '.pxgalleryBox'
})
```

When set the images:

```
pxgallery.setImage({
  
    layout:           2,
    puzzleHeight:     400,
    fullscreenState:  true,
    column:           5,
    heightMin:        150, 
    mdSquareSize:     3,
    smSquareSize:     6,
    gutter:           10
})
```

Available layouts:

```
 this.layout = {
      NONE: 0,      // no layout
      PUZZLE: 1,    // puzzle layout
      WATERFALL: 2, // waterfall layout
      BARREL: 3,    // barrel layout
      SQUARE: 4     // square layout
    };
```

# API

```
/**
  * init the album
  * It will replace the photos
  * @param {(Stirng | String[])} image - the URL of the photo or the URL array of the photos
  * @param {Object} opts - layout options
  */
  
pxgallery.setImage();
`

/**
  * get the DOM elements which contain the images
  * @return {HTMLelement[]} boxes
  */
   
pxgallery.getImageDomElements();

/**
  * add images to the container
  * @param {(String | String[])} image - the URL of the photo or the URL array of the photos
  * @param {Boolean} raw - weather add the images to the container directly  or not
  */

pxgallery.addImage();

/**
  * remove the images
  * @param {(HTMLelement|HTMLelement[])} image - the images that need to be removed
  */

pxgallery.removeImage();

/**
  * set the layout
  * @param {Number} - layoutValue
  */

pxgallery.setLayout();

/**
  * get current layout
  * @return {Number} -_options.layout
  */

pxgallery.getLayout();

/**
  * clear the layouts
  */

pxgallery.clearLayout();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * set the gutter between images
  * @param {Number} - gutter
  */

pxgallery.setGutter();

/**
  * enable fullscreen
  */
   
pxgallery.enableFullscreen() ;

/**
  * disable fullscreen
  */

pxgallery.disableFullscreen();

/**
  * @return {Boolean} weather eenable fullscreen view
  */

pxgallery.isFullscreenEnabled();

/**
  * set the 2nd image square
  * @param {Number} length -the number of the images
  */

pxgallery.setPuzzleSquare();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * set the height of the container
  * @param {Number} - height
  */

pxgallery.setPuzzleHeight();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * set the number of the column
  * @param {NUmber} - columnNum
  */

pxgallery.setColumnNum();

/**
  * init the waterfall column only after clear the columns inside the container
  * @param {NUmber} - columnNum
  */

pxgallery.initWaterfallColumn();

/**
  * get minimun height index of the column
  * @return {Number} - index
  */

pxgallery.getWaterfallHeightMin();

/**
  * initaialize the barrel layout
  * @param {Object} - row, a row object which contain height
  */

pxgallery.initBarrelBin();

/**
  * calculate the ratio
  * @return {Object} - rows
  */
  
pxgallery.setBarrelBin();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * set the height of the barrel
  * @param {Number} - min
  */
pxgallery.setBarrelHeight();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * Set the suqare size when over 768 px
  * @param {Number} size - (1-12)
  */

pxgallery.setMdSquareSize();

/**
  * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
  * Set the suqare size when under 768 px
  * @param {Number} size - (1-12)
  */

pxgallery.setSmSquareSize();
```

# License
Released under the [MIT license](https://opensource.org/licenses/MIT).