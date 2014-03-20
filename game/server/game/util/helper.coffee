getCanvas=(name)->
  canvas=$('#'+name)[0];
  return canvas.getContext('2d');

clearCanvas=(name)->
  canvas=$('#'+name)[0]
  ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height)

avg=(a,b)->
  return (a+b)/2

window.avg=avg
window.getCanvas=getCanvas
window.clearCanvas=clearCanvas