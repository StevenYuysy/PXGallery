/**
 *
 * pxgallery v0.0.1
 * use with pxgallery.css
 * @author StevenYu
 */

;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.pxgallery = factory();
  }

}(this, function() {

  'use strict';

  /**
   * @param {Object} opts - options used in plugin
   * @constructor
   */

  var pxgallery = function(opts) {


    opts = opts || {};
    var fullscreenSelector = opts.fullscreenSelector || '.pxfullscreen';

    this.containerSelector = opts.containerSelector || '.pxgalleryContainer';
    this.boxSelector = opts.boxSelector || '.pxgalleryBox';
    this.container = document.querySelector(this.containerSelector);
    this.fullscreen = document.querySelector(fullscreenSelector);

    this.layout = {
      NONE: 0,      // no layout
      PUZZLE: 1,    // puzzle layout
      WATERFALL: 2, // waterfall layout
      BARREL: 3,    // barrel layout
      SQUARE: 4     // square layout
    };

  };

  /**
   * @private
   */

   var _options = {
     layout : '',
     puzzleHeight:'',
     coulumn : '',
     heightMin : '',
     gutter : '',
     mdSquareSize:'',
     smSquareSize:'',
     fullscreenState : '',
     images: []
   }

   // create a fullscreen for images with next and prev
   var _createFullscreen = function(event) {
     if (event.target.getAttribute('src').trim()) {
      var fullscreen = document.createElement('div');
      var img = document.createElement('img');
      var next = document.createElement('span');
      var prev = document.createElement('span');
      var currentImg = event.target.getAttribute('src');
      var currentImgIndex = _options.images.indexOf(currentImg);
      fullscreen.className = 'pxfullscreen';
      next.className = 'pxnext';
      prev.className = 'pxprev';
      img.src = currentImg;
      fullscreen.addEventListener('click', function(event) {
        if (event.target != next && event.target != prev) {
        this.remove();
        }
      }, false);
      next.addEventListener('click', function() {
        currentImgIndex++;
        if (currentImgIndex >= _options.images.length) currentImgIndex = 0;
        img.src = _options.images[currentImgIndex];
      }, false);
      prev.addEventListener('click', function() {
        currentImgIndex--;
        if (currentImgIndex <= 0) currentImgIndex = (_options.images.length - 1);
        img.src = _options.images[currentImgIndex];
      })

      fullscreen.appendChild(prev);
      fullscreen.appendChild(next);
      fullscreen.appendChild(img);
      this.parentNode.appendChild(fullscreen);
     }
   };

   // add the box into column or row
   var _addBox = function(ele, index) {
    switch (_options.layout) {
      case 2:
      this.columns ? this.columns[index].appendChild(ele) : this.container.appendChild(ele);
      break;
      case 3:
      this.rows ? this.rows[index].appendChild(ele) : this.container.appendChild(ele);
      break;
      default:
      this.container.appendChild(ele);
      this.setLayout(_options.layout);
    }
  }


  /**
   * init the album
   * It will replace the photos
   * @param {(Stirng | String[])} image - the URL of the photo or the URL array of the photos
   * @param {Object} opts - layout options
   */

  pxgallery.prototype.setImage = function(image, opts) {

    if (typeof image === 'string') {
      this.setImage([image]);
      return;
    }

    _options.layout = opts.layout || 2;
    _options.puzzleHeight = opts.puzzleHeight || 400;
    _options.fullscreenState = opts.fullscreenState || true;
    _options.column = opts.column || 5;
    _options.heightMin = opts.heightMin || 150;
    _options.mdSquareSize = opts.mdSquareSize || 3;
    _options.smSquareSize = opts.smSquareSize || 6;
    _options.gutter = opts.gutter || 10;
    var _this = this;

    this.addImage(image, true);
    this.setLayout(_options.layout);
    _options.fullscreenState ? this.enableFullscreen() : this.disableFullscreen();

    window.onload = function() {
      _this.setLayout(_options.layout);
    }

    window.onresize = function() {
      _this.setLayout(_options.layout);
    }
  };

  /**
   * get the DOM elements which contain the images
   * @return {HTMLelement[]} boxes
   */

  pxgallery.prototype.getImageDomElements = function() {

    var boxes = Array.prototype.slice.call(this.container.querySelectorAll(this.boxSelector));
    var url = [];
    boxes.forEach(function(ele) {
      ele.ratio = ele.clientWidth / ele.clientHeight;
      url.push(ele.querySelector('img').src);
    }, this);
    _options.images = url;
    return boxes;
  };

  /**
   * add images to the container
   * @param {(String | String[])} image - the URL of the photo or the URL array of the photos
   * @param {Boolean} raw - weather add the images to the container directly  or not
   */

  pxgallery.prototype.addImage = function(image, raw) {

    if (typeof image === 'string') {
      this.addImage([image]);
      return;
    }
    if (!raw) {
    if (_options.layout === 2) var index = this.getWaterfallHeightMin();
    if (_options.layout === 3) var index = (this.rows.length - 1);
    }

    for (var i = 0; i < image.length; i++) {
      var div = document.createElement('div');
      var img = new Image();
      div.className = 'pxgalleryBox';
      div.style.border = _options.gutter / 2 + 'px solid transparent';
      img.src = image[i];
      _options.images.push(image[i]);
      div.appendChild(img);
      if (!raw) {
        (_options.layout === 2 || _options.layout === 3 ) ? _addBox.call(this, div, index) : _addBox.apply(this, [div]);
      }
      else {
        _addBox.apply(this, [div])
      }
    }
  };

  /**
   * remove the images
   * @param {(HTMLelement|HTMLelement[])} image - the images that need to be removed
   */

  pxgallery.prototype.removeImage = function(image) {

    image.forEach(function(ele) {
      var removeUrl = ele.querySelector('img').src;
      _options.images = _options.images.filter(function (url) {
        return url != removeUrl;
      })
      ele.remove();
    }, this)

  };

  /**
   * set the layout
   * @param {Number} - layoutValue
   */

  pxgallery.prototype.setLayout = function(layoutValue) {

    var boxes = this.getImageDomElements();
    this.clearLayout();
    _options.layout = layoutValue;

    switch (layoutValue) {

      case 0:
      break;

      case 1:
      if (boxes.length > 6) {
        console.error('PUZZLE layout only can contain 6 photos');
        break;
      }
      this.container.style.height = _options.puzzleHeight + 'px';
      this.container.className = this.containerSelector.slice(1) + ' puzzle-' + boxes.length;
      this.setPuzzleSquare(boxes.length);
      break;

      case 2:
      this.container.className = this.containerSelector.slice(1) + ' waterfall';
      this.initWaterfallColumn(_options.column);
      for (var i = 0; i < boxes.length; i++) {
        _addBox.call(this, boxes[i], this.getWaterfallHeightMin());
      }
      break;

      case 3:
      this.container.className = this.containerSelector.slice(1) + ' barrel';
      var rows = this.setBarrelBin();
      this.initBarrelBin(rows);
      var index = 0;
      for (var i = 0; i < boxes.length; i++) {
        if (i > rows[index].number) index ++;
        boxes[i].style.height = '100%';
        boxes[i].style.width = '';
        _addBox.call(this, boxes[i], index);
      }
      break;

      case 4:
      this.container.className = this.containerSelector.slice(1) + ' square';
      for (var i = 0; i < boxes.length; i++) {
        var md = 'col-md-' + _options.mdSquareSize;
        var sm = 'col-sm-' + _options.smSquareSize;
        boxes[i].className = this.boxSelector.slice(1) + ' ' + md + ' ' + sm;
      }
    }
  };

  /**
   * get current layout
   * @return {Number} -_options.layout
   */

  pxgallery.prototype.getLayout = function() {
    return _options.layout;
  };

  pxgallery.prototype.clearLayout = function() {

    var boxes = this.getImageDomElements();
    var _this = this;
    this.container.className = this.containerSelector.slice(1);
    this.container.style.height = '';
    boxes.forEach(function(ele) {
      ele.style.width = '';
      ele.style.height = '';
    }, this)

    if (this.columns) {
      this.columns.forEach(function(ele) {
        ele.remove();
      }, this)
      boxes.forEach(function(ele) {
        _this.container.appendChild(ele);
      }, this)
    }

    if (this.rows) {
      this.rows.forEach(function(ele) {
        ele.remove();
      }, this)
      boxes.forEach(function(ele) {
        _this.container.appendChild(ele);
      }, this)
    }
    _options.layout = 0;
  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * set the gutter between images
   * @param {Number} - gutter
   */

  pxgallery.prototype.setGutter = function(gutter) {

    _options.gutter = gutter;
    var boxes = this.getImageDomElements()
    boxes.forEach(function(ele) {
      ele.style.border = (gutter / 2) +'px solid transparent';
    }, this)
  };

  /**
   * enable fullscreen
   */

  pxgallery.prototype.enableFullscreen = function() {

    _options.fullscreenState = true;
    this.container.addEventListener('click', _createFullscreen, false);
  };

  /**
   * disable fullscreen
   */

  pxgallery.prototype.disableFullscreen = function() {

    _options.fullscreenState = false;
    this.container.removeEventListener('click', _createFullscreen, false);
  };

  /**
   * @return {Boolean} weather eenable fullscreen view
   */

  pxgallery.prototype.isFullscreenEnabled = function() {

    return _options.fullscreenState;
  };

  /**
   * set the 2nd image square
   * @param {Number} length -the number of the images
   */

  pxgallery.prototype.setPuzzleSquare = function(length) {

    var boxes = this.getImageDomElements();
    if (length === 3) {
      var sideLength = parseFloat(this.container.clientHeight) / 2;
      boxes[0].style.width = (this.container.clientWidth - sideLength) + 'px';
      boxes[1].style.height = sideLength + 'px';
      boxes[1].style.width = sideLength + 'px';
      boxes[2].style.height = sideLength + 'px';
      boxes[2].style.width = sideLength + 'px';
    } else if (length === 5) {
      var sideLength = parseFloat(this.container.clientWidth / 3);
      if (parseInt(sideLength + (_options.gutter * 2)) <  parseInt(_options.puzzleHeight)) {
        boxes[0].style.width = parseFloat(this.container.clientWidth - sideLength) + 'px';
        boxes[1].style.width = sideLength + 'px';
        boxes[1].style.height = sideLength + 'px';
        boxes[2].style.width = sideLength + 'px';
        boxes[2].style.height = parseFloat(this.container.clientHeight - sideLength) + 'px';
      } else {
        boxes.forEach(function(ele) {
          ele.style.width = '';
          ele.style.height= '';
        }, this);
      }
    } else {
      return;
    }
  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * set the height of the container
   * @param {Number} - height
   */

  pxgallery.prototype.setPuzzleHeight = function(height) {
    _options.puzzleHeight = height;
    if (_options.layout === 1) this.setLayout(_options.layout);
  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * set the number of the column
   * @param {NUmber} - columnNum
   */

  pxgallery.prototype.setColumnNum = function(columnNum) {
    _options.column = columnNum;
    if (_options.layout === 2) this.setLayout(2);
  };

  /**
   * init the waterfall column only after clear the columns inside the container
   * @param {NUmber} - columnNum
   */

  pxgallery.prototype.initWaterfallColumn = function(columnNum) {
    // create column div
    this.columns = [];
    for (var i = 0; i < columnNum; i++) {
      var columnDiv = document.createElement('div');
      columnDiv.style.width = (100/columnNum) + '%';
      columnDiv.setAttribute('class','waterfallColumn');
      this.columns.push(columnDiv);
      this.container.appendChild(columnDiv);
    }
  };

  /**
   * get minimun height index of the column
   * @return {Number} - index
   */

  pxgallery.prototype.getWaterfallHeightMin = function() {

    var min = this.columns[0].clientHeight;
    var index = 0;
    for (var i = 0; i < this.columns.length; i++) {
      if (this.columns[i].clientHeight < min) {
        min = this.columns[i].clientHeight;
        index = i;
      }
    }
    return index;
  };

  /**
   * initaialize the barrel layout
   * @param {Object} - row, a row object which contain height
   */

  pxgallery.prototype.initBarrelBin = function(row) {

    this.rows = [];
    for (var i = 0; i < row.length; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = 'barrelRow';
      rowDiv.style.height = row[i].height + 'px';
      this.rows.push(rowDiv);
      this.container.appendChild(rowDiv);
    }
  };

  /**
   * calculate the ratio
   * @return {Object} - rows
   */

  pxgallery.prototype.setBarrelBin = function() {

    var boxes = this.getImageDomElements();
    var height = _options.heightMin;
    var rows = [];
    var width = 0;
    var count = 0;
    var ratio;
    var totalWidth;
    var totalHeight;
    var restWidth;
    var i;

    // compare the total width with the container width
    // if the total width is grater than container width
    // than push to the row array which include the number and height
    // clear data and loop again until end

    for (i = 0; i < boxes.length; i++) {
      boxes[i].style.height = height + 'px';
      boxes[i].style.width = (height * boxes[i].ratio) + 'px';
      width += height * boxes[i].ratio;
      if (width > this.container.clientWidth) {
        totalWidth = width - boxes[i].clientWidth;
        ratio = height / totalWidth;
        totalHeight = this.container.clientWidth * ratio;
        rows.push({number: i-1, height: totalHeight});
        width = boxes[i].clientWidth;
      }
    }
    rows.push({number: i, height: _options.heightMin});

    return rows;

  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * set the height of the barrel
   * @param {Number} - min
   */

  pxgallery.prototype.setBarrelHeight = function(min) {

    _options.heightMin = min;
    if (_options.layout === 3) this.setLayout(3);
  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * Set the suqare size when over 768 px
   * @param {Number} size - (1-12)
   */

  pxgallery.prototype.setMdSquareSize = function(size) {

    _options.mdSquareSize = size;
    if (_options.layout === 4) this.setLayout(_options.layout)
  };

  /**
   * NOT RECOMMAND, it may effect the perfomance of the browser cause it change the DOM directly
   * Set the suqare size when under 768 px
   * @param {Number} size - (1-12)
   */

  pxgallery.prototype.setSmSquareSize = function(size) {

    _options.smSquareSize = size;
    if (_options.layout === 4) this.setLayout(_options.layout)
  };

  return pxgallery;
}));
