(function() {

  var basisVectors = [
    {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 1, y: -1},
    {x: 0, y: -1}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: -1},
  ];

  // Creates a function that generates perlin noise with particular parameters.
  window.perlinSimplex = function (octaves, falloff) {
    octaves = octaves || 1;
    falloff = falloff || 0.5;

    var i;
    var perms = [];

    for (i = 0; i < 256; i++) {
      perms.push(Math.floor(Math.random() * 256));
    }
    for (i = 0; i < 256; i++) {
      perms[i + 256] = perms[i];
    }

    // Perlin constants.
    var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    var F3 = 1.0 / 3.0;
    var G3 = 1.0 / 6.0;
    var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
    var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

    var result, freq, pers;
    var octFreq = [];
    var octPers = [];
    var persMax = 0;

    for (i = 0; i < octaves; i++) {
      freq = Math.pow(2, i);
      pers = Math.pow(falloff, i);
      persMax += pers;
      octFreq.push(freq);
      octPers.push(pers);
    }
    persMax = 1 / persMax;

    function dotProduct(g, x, y) {
      return g.x * x + g.y * y;
    }

    // Calculates raw perlin noise for a given coordinate.
    function noise2d(xin, yin) {
      var n0, n1, n2;
      // Perlin numbers
      var s = (xin + yin) * F2;
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var x0 = xin - (i - t);
      var y0 = yin - (j - t);

      var i1, j1;
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } else {
        i1 = 0;
        j1 = 1;
      }

      var ii = i % 256;
      var jj = j % 256;

      var x1 = x0 - i1 + G2;
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2;
      var y2 = y0 - 1.0 + 2.0 * G2;

      var gi0 = perms[ii + perms[jj]] % basisVectors.length;
      var gi1 = perms[ii + i1 + perms[jj + j1]] % basisVectors.length;
      var gi2 = perms[ii + 1 + perms[jj + 1]] % basisVectors.length;

      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) {
        n0 = 0.0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * dotProduct(basisVectors[gi0], x0, y0);
      }

      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) {
        n1 = 0.0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * dotProduct(basisVectors[gi1], x1, y1);
      }

      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 < 0) {
        n2 = 0.0;
      } else {
        t2 *= t2;
        n2 = t2 * t2 * dotProduct(basisVectors[gi2], x2, y2);
      }

      return 70.0 * (n0 + n1 + n2);
    }

    // Scaled perlin noise, with the appropriate number of octaves at a given point.
    // This is the function the user calls.
    return function noise(x, y) {
      var result = 0;
      var freq, pers;
      for (var g = 0; g < octaves; g++) {
        freq = octFreq[g];
        pers = octPers[g];
        result += pers * noise2d(freq * x, freq * y);
      }
      return result;
    };
  };

})();
