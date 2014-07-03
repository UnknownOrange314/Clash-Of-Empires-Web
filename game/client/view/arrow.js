// Generated by CoffeeScript 1.7.1
(function() {
  var drawArrow, drawLine, drawTriangle;

  drawLine = function(x1, y1, x2, y2, ctx,color) {

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    return ctx.restore();
  };

  drawTriangle = function(x2, y2, angle, ctx,color) {
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(angle);
    ctx.translate(-x2, -y2);
    ctx.strokeStyle=color
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.moveTo(x2, y2 - 5);
    ctx.lineTo(x2, y2 + 5);
    ctx.lineTo(x2 + 5, y2);
    ctx.closePath();
    ctx.fill();
    return ctx.restore();
  };


  /*
    Draws an arrow.
    @param x1 The starting x coordinate.
    @param y1 The starting y coordinate.
    @param x2 The final x coordinate.
    @param y2 The final y coordinate.
    @param ctx The graphics drawing object.
   */

  drawArrow = function(x1, y1, x2, y2, ctx,color) {
    var aX, aY, angle;
    aX = x2 - x1;
    aY = y2 - y1;
    angle = MathHelper.findAngle(aX, aY);
    x1 += 15 * Math.cos(angle);
    y1 += 15 * Math.sin(angle);
    x2 -= 15 * Math.cos(angle);
    y2 -= 15 * Math.sin(angle);
    drawLine(x1, y1, x2, y2, ctx,color);
    return drawTriangle(x2, y2, angle, ctx,color);
  };

  window.drawArrow = drawArrow;

  window.drawLine = drawLine;

}).call(this);

//# sourceMappingURL=arrow.map
