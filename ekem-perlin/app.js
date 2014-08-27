/* globals perlinSimplex: false */
(function() {
  'use strict';


  // Constants
  var WIDTH = 500;
  var HEIGHT = 500;

  // Make a canvas
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', WIDTH);
  canvas.setAttribute('height', HEIGHT);
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var imgData = ctx.createImageData(WIDTH,HEIGHT);
  var pixels = imgData.data;

  var perlin = perlinSimplex(10, 0.5);
  var scale = 0.01;

  var x, y;
  var height, colors;

  for (var i = 0; i < pixels.length; i += 4) {
    x = (i / 4) % WIDTH * scale;
    y = (i / 4) / WIDTH * scale;
    height = perlin(x, y);

    if (height > 1.1) {
      colors = [255, 255, 255];
    } else if (height > 0.7) {
      colors = [150, 150, 160];
    } else if (height > 0.5) {
      colors = [120, 120, 70];
    } else if (height > 0.4) {
      colors = [120, 120, 0];
    } else if (height > 0.05) {
      colors = [50, 100, 0];
    } else if (height > -0.2) {
      colors = [0, 0, 120];
    } else {
      colors = [0, 0, 50];
    }

    pixels[i + 0] = colors[0];
    pixels[i + 1] = colors[1];
    pixels[i + 2] = colors[2];
    pixels[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);

})();
