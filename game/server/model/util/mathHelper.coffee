#Returns angle in degrees
angle=(x,y)->
  a=Math.PI/2 if x==0&&y>0
  a= -Math.PI/2 if x==0&&y<0
  a= Math.atan(y/x) if x>0
  a= Math.atan(-y/-x)+Math.PI if x<0
  a=a+2*Math.PI if a<0
  return a
window.findAngle=angle