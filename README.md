# Shape-Maker
## What it is:
A paint like tool to make complex vector art / models and export as a .js file to be used in p5 apps and games

## How to use it
- click "line" or "circle" to draw the respective shape
- set the color of the stroke and fill
- click on the stroke or fill color boxes to hide the shape or fill color
- change the thickness slider to set stroke width
-set name and press "export JS" to save the shape file, ready to be used in p5js apps

## Drawing lines
- first left-click sets the first line
- subsequent left clicks sets more lines
- right-click cancels line drawing

## Drawing circles
- first left-click sets the center
- second left-click sets the radius
- right-click cancels circle drawing

## Moving the canvas
- WSAD keys pan the view around, useful for larger drawings

## shapefile interface
- after including the new .js file to your project, you instantiate the shape class like this:
```
//exported shape file called 'example.js'
let newShape = example();
```
-to draw the shape you must add the Draw() call to the draw() function in your main canvas draw call:
```
function draw(){
  newShape.Draw();
}
```

-to move the shape around you change the x and y parameters, and change the angle via the angle parameter, in Degrees.

```
function draw(){
  newShape.x+=20;
  newShape.y-=0.5;
  newshape.angle = 10;
  newShape.Draw();
}
```

