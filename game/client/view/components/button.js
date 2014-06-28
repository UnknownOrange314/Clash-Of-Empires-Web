/**
 * Represents a clickable button.
 * @param tx The top x coordinate of the button.
 * @param by The top y coordinate of the button.
 * @param text The text on the button.
 * @param clickFun The function that is called when the button is clicked.
 * @constructor
 */
function Button(tx,ty,text,clickFun){

    var label=new Label(text,tx+20,ty+20);
    var col="#FFE5B4";
    var height=40;
    var width=140;

    this.checkClick=function(x,y){
        if(x>tx&&x<tx+width){
            if(y>ty&&y<ty+height){
                clickFun(text);
            }
        }
    }

    this.draw=function(ctx){
        ctx.fillStyle="#5961BB";
        ctx.fillRect(tx,ty,width,height);
        label.draw(ctx);
    }
}