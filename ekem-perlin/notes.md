* Hungarian notation is generally not a good idea, and isn't common in JS.
* A common pattern is a function that makes a function. The PerlinNoise
  function was basically that.
* The Grad class was basically useless. It's role is served just as well by
  a plain object like `{x: 0, y: 1}`.
* Generally, if a class only has two methods, and one of them is the
  constructor, it shouldn't be a class.
* Put spaces around operators.
* Think about variable names more, especially from the point of view of someone
  reading the code. If the variable name isn't clear and can't be made better,
  add a comment. To quote the Rust docs: "A variable name's length should be
  proportional to the distance from the definition that it is used, and
  inversely proportional to how often it is used.
* Dead code is death. If code isn't being used, delete it. If you are worried
  you might need it later, commit it, and then delete it.
* The code took parameters for 4 dimensions, but only used 2. Code that lies
  (in it's comments, parameters, or variable names) is worse than dead code.
* I changed the colors minorly, mainly because I couldn't figure out the logic
  of the old one because it was not straight forward or commented.
