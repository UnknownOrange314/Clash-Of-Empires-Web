/**
 * This file contains helper methods for canvases.
 */

//TODO: Make sure these functions do not have global scope.

getCanvas = function(name) {
    var canvas;
    canvas = $('#' + name)[0];
    return canvas.getContext('2d');
};

clearCanvas = function(name) {
    var canvas, ctx;
    canvas = $('#' + name)[0];
    ctx = canvas.getContext('2d');
    return ctx.clearRect(0, 0, canvas.width, canvas.height);
};

getWidth=function(name){
    var canvas=$('#' + name)[0];
    return canvas.width;
}

getHeight=function(name){
    var canvas=$('#' + name)[0];
    return canvas.height;
}

/**
 * Transforms a click event into canvas coordinates.
 * @param e
 */
transformClick=function(e,ctx){
    var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    console.log(x);
   // x -= ctx.offsetLeft;
   // y -= ctx.offsetTop;
    console.log(x);
    var a=Array()
    a.push(x);
    a.push(y);
    return a;
}