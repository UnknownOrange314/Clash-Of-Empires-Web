function MathHelper(){
}

MathHelper.findAngle=function(x,y){
    var a;
    if (x === 0 && y > 0) {
        a = Math.PI / 2;
    }
    if (x === 0 && y < 0) {
        a = -Math.PI / 2;
    }
    if (x > 0) {
        a = Math.atan(y / x);
    }
    if (x < 0) {
        a = Math.atan(-y / -x) + Math.PI;
    }
    if (a < 0) {
        a = a + 2 * Math.PI;
    }
    return a;
}