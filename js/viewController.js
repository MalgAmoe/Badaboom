var stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
})

var layer = new Konva.Layer()
stage.add(layer)

//--------------------------variables
var padX = 3 * stage.getWidth() / 8
var padY = stage.getHeight() / 8
var padWidth = stage.getWidth() / 4

//--------------------------- create shapes
var xyBackground = new Konva.Rect({
  x: padX,
  y: padY,
  width: padWidth,
  height: padWidth,
  fill: 'white'
})

var xyPad = new Konva.Rect({
  x: padX,
  y: padY,
  width: padWidth,
  height: padWidth,
  fill: '#00D2FF',
  opacity: 0.8
})

var xyPosition = new Konva.Circle({
  x: padX + padWidth / 2,
  y: padY + padWidth / 2,
  radius: padWidth / 20,
  fill: 'black'
})

var xyValue = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'white'
})

layer.add(xyBackground)
layer.add(xyPosition)
layer.add(xyPad)
layer.add(xyValue)

layer.draw()

//--------------------------XY touch control

var clicking = false;

function updateXY(position) {
  xyPosition.setX(position.x)
  xyPosition.setY(position.y)
  var value = (position.x - padX) / padWidth + ', ' + (position.y - padY) / padWidth
  xyValue.setText(value)
  layer.draw()
}

xyPad.on('mouseover', function() {
  document.body.style.cursor = 'pointer'
})
xyPad.on('mouseout', function() {
  clicking = false,
  document.body.style.cursor = 'default'
})
xyPad.on('mousedown', function() {
  clicking = true
  updateXY(stage.getPointerPosition())
})
xyPad.on('mouseup', function() {
  clicking = false
})
xyPad.on('mousemove', function() {
  if (clicking) {
    updateXY(stage.getPointerPosition())
  }
})
