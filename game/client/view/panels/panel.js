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
    var font='16pt Calibri';
    var ctx=getCanvas(cName);

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

    this.clearPanel=function(){
        ctx.fillStyle=(backCol);
        ctx.fillRect(x,y,w,h);
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
        ctx.fillText(text,x,y-10);
    }

    this.drawImage=function(img,x,y,size){
        ctx.drawImage(img,x,y,size,size*img.height/img.width);
    }

}