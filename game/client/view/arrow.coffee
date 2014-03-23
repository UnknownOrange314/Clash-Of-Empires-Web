

drawLine=(x1,y1,x2,y2,ctx)->
  ctx.save()
  ctx.strokeStyle="Gray"
  ctx.lineWidth=2
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.stroke()
  ctx.restore()

drawTriangle=(x2,y2,angle,ctx)->
  ctx.save()
  ctx.translate(x2,y2)
  ctx.rotate(angle)
  ctx.translate(-x2,-y2)
  ctx.fillStyle="Gray"
  ctx.beginPath();
  ctx.moveTo(x2,y2-5);
  ctx.lineTo(x2,y2+5);
  ctx.lineTo(x2+5,y2);
  ctx.closePath()
  ctx.fill()
  ctx.restore()

###
  Draws an arrow.
  @param x1 The starting x coordinate.
  @param y1 The starting y coordinate.
  @param x2 The final x coordinate.
  @param y2 The final y coordinate.
  @param ctx The graphics drawing object.
###
drawArrow=(x1,y1,x2,y2,ctx)->
  aX=x2-x1
  aY=y2-y1
  angle=findAngle(aX,aY)

  #Generate offsets.
  x1+=15*Math.cos(angle)
  y1+=15*Math.sin(angle)
  x2-=15*Math.cos(angle)
  y2-=15*Math.sin(angle)
  drawLine(x1,y1,x2,y2,ctx)
  drawTriangle(x2,y2,angle,ctx)



window.drawArrow=drawArrow
window.drawLine=drawLine