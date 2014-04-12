function Label(text,x,y,size){
    if(size===undefined){
        size=14
    }

    this.getText=function(){
        return text;
    }

    this.setText=function(txt){
        text=txt;
    }

    this.draw=function(ctx){
        ctx.fillStyle="#FFFFFF";
        ctx.font=size+'pt Calibri'
        ctx.fillText(text,x,y);
    }
}
