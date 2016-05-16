
var a = new pxgallery();
a.setImage([
    "http://placehold.it/1300x1600/E97452/fff",
    "http://placehold.it/1300x1300/4C6EB4/fff",
    "http://placehold.it/1300x1250/449F93/fff",
    "http://placehold.it/800x400/936FBC/fff",
    "http://placehold.it/1000x500/D25064/fff",
    // "http://placehold.it/1300x1200/CF364A/fff"
],
{
    layout: 4,
    fullscreenState: true,
});

//Get the DOM element
var custom = document.getElementById('customize');
var C_submenu = custom.querySelector('.submenu');
var edit = document.getElementById('edit');
var E_submenu = edit.querySelector('.submenu');
var select = document.getElementById('select');
var container = document.querySelector('.pxgalleryContainer');
var remove = document.getElementById('remove');
var add = document.getElementById('add');

custom.addEventListener('click', function() {
  C_submenu.classList.toggle('hidden');
})

C_submenu.addEventListener('click', function(event) {
  switch (event.target.dataset.layout) {
    default:
    C_submenu.classList.toggle('hidden');
    case 'puzzle':
    a.setLayout(1);
    break;
    case 'waterfall':
    a.setLayout(2);
    break;
    case 'barrel':
    a.setLayout(3);
    break;
    case 'square':
    a.setLayout(4);
  }
})


select.addEventListener('click', function() {
  a.disableFullscreen();
  container.addEventListener('click', function(event) {
    if (event.target.tagName = 'IMG') {
      var boxes = a.getImageDomElements();
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i] === event.target.parentNode) {
          boxes[i].classList.toggle('selected');
        }
      }
    }
  })
})

remove.addEventListener('click', function() {
  var boxes = a.getImageDomElements();
  for (var i = 0; i < boxes.length; i++) {
    if (/selected/.test(boxes[i].className)) {
      boxes[i].remove();
    }
  }
})

add.addEventListener('click', function() {
  
})