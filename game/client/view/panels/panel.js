/**
 * This represents a panel for the user interface.
 * @param x The top x position of the panel.
 * @param y The top y position of the panel.
 * @param w The width of the panel.
 * @param h The height of the panel.
 * @param bg The background color.
 * @constructor
 */
function Panel(x,y,w,h,cName,bg){

    var backCol=bg; //The color of the background.
    var drawCol="#1A1D44";
    var textCol="#FFFFFF";
    var font='16pt Calibri';
    var ctx=Panel.getCanvas(cName);

    this.clearCanvas=function(){
        ctx.clearRect(0, 0, Panel.getWidth(cName),Panel.getHeight(cName));
    }

    this.fillBackground=function(){
        ctx.fillStyle=(backCol);
        ctx.fillRect(x,y,Panel.getWidth(cName),Panel.getHeight(cName));
    }

    this.setTextColor=function(col){
        textCol=col;
    }

    this.getColor=function(){
        return backCol;
    }

    this.setBackgroundCol=function(col){
        backCol=col;
    }

    this.setColor=function(col){
        drawCol=col;
    }

    this.setFont=function(f){
        font=f;
    }



    this.drawComponent=function(item){
        item.draw(ctx);
    }

    this.getCanvas=function(){
        return ctx;
    }

    this.drawColumn=function(y,dH,data,fun){
        data.forEach(function(item){
            fun(item,y);
            y+=dH;
        })
    }

    this.fillText=function(text,x,y){
        ctx.font=font;
        ctx.fillStyle=textCol;
        ctx.fillText(text,x,y);
    }

    this.drawImage=function(img,x,y,size){
        ctx.drawImage(img,x,y,size,size*img.height/img.width);
    }

    /**
     * This returns the canvas drawing object.
     */
    this.getGraphics=function(){
        return ctx;
    }

    var clearCanvas = function(name) {
        var canvas;
        canvas = $('#' + name)[0];
        return ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

}

Panel.getCanvas=function(name){
    var canvas;
    canvas = $('#' + name)[0];
    return canvas.getContext('2d');
}

/*
Static methods.
 */
Panel.getWidth=function(name){
    var canvas=$('#' + name)[0];
    return canvas.width;
}

Panel.getHeight=function(name){
    var canvas=$('#' + name)[0];
    return canvas.height;
}

/**
 * TODO: Make this return a point object instead of an array
 * Transforms a click event into canvas coordinates.
 * @param e
 */
Panel.transformClick=function(e){
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
    // x -= ctx.offsetLeft;
    // y -= ctx.offsetTop;
    var a=Array()
    a.push(x);
    a.push(y);
    return a;
}