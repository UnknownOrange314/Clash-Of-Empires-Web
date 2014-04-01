function ScoreView(config){

    var h=1000;
    var w=200;
    var startH=150;

    /**
     * This function is responsible for drawing the score panel.
     * It should probably be
     * @param flags
     */
    var drawPanel=function(flags){

        var ctx=getCanvas('score');
        ctx.fillStyle="#C0C0C0";
        ctx.fillRect(0,0,w,1000);
        ctx.fillStyle="#000000";
        ctx.font='40pt Calibri';
        ctx.fillText("Score",50,80);
        var size=40;
        var xPos=40;
        var h=startH;
        var dH=60;
        //TODO: Make sure that the names are not hardcoded.
        var names=new Array("Russia","Turkey","France","England");
        ctx.fillStyle="#000000";
        ctx.font='14pt Calibri';
        var textIdx=0;

        for(var key in flags){
            console.log("Flag"+flags[key]);
            var img=flags[key];
            ctx.fillText(names[textIdx],xPos,h-10);
            ctx.drawImage(img,xPos,h,size,size*img.height/img.width);
            h+=dH;
            textIdx++;
        }
    }




    var update=function(dataCon){

        var pData=dataCon.getPlayerState();
        var x=120;
        var y=startH;
        var dH=60;
        Object.keys(pData).forEach(function(name){
            ctx.fillStyle="#000000";
            ctx.font='14pt Calibri';
            ctx.fillText(pData[name]["score"],x,y);
            y+=dH;
        });


        y+=200;
        ctx.font='24pt Calibri';
        ctx.fillText("Resources",x-80,y);
        ctx.font='12pt Calibri';
        //TODO: Make sure that this is not hardcoded to use a specific player name.
        ctx.fillText("Money",x-80,y+60); //This is a bug.
        ctx.fillText("$"+pData["Russian"]["money"],x-20,y+60); //This is a bug.
    }


    var ctx=getCanvas('score');
    loadFlags(config["FlagData"],drawPanel);

    var panel=new Panel(100,100,100,600,"#C0C0C0",update,ctx);
    this.update=function(data){
        panel.update(data)
    }
}

