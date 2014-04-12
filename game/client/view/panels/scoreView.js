/**
 * This is responsible for showing information about the performance of players.
 * TODO:Make sure the label positions here are not hardcoded.
 * @param config The configuration
 * @constructor
 */
function ScoreView(config){

    var h=1000;
    var w=200;
    var startH=150;

    var resources=new Label("Resources",40,400,24);
    var money=new Label("Money",70,440,14);
    var score=new Label("Score",50,80,40);

    var resources=new Label("Resources",40,400,24);
    var score=new Label("Score",50,80,40);

    var scoreLabels=Array();
    for(var i=0;i<4;i++){
        y=150+60*i
        scoreLabels.push(new Label("S",120,y,14));
        console.log("J:"+scoreLabels.length);
    }

    /**
     * @param flags
     */
    var drawPanel=function(flags){

        var ctx=getCanvas('score');
        ctx.fillStyle="#1A1D44";
        ctx.fillRect(0,0,w,1000);
        ctx.fillStyle="#000000";
        score.draw(ctx);
        var size=40;
        var xPos=20;
        var h=startH;
        var dH=60;
        //TODO: Make sure that the names are not hardcoded.
        var names=new Array("Russia","Turkey","France","England");
        ctx.fillStyle="#FFFFFF";
        ctx.font='16pt Calibri';
        var textIdx=0;
        for(var key in flags){
            var img=flags[key];
            ctx.fillText(names[textIdx],xPos,h-10);
            ctx.drawImage(img,xPos,h,size,size*img.height/img.width);
            h+=dH;
            textIdx++;
        }
    }


    var ctx=getCanvas('score');
    loadFlags(config["FlagData"],drawPanel);
    var panel=new Panel(100,100,100,600,ctx);

    this.update=function(dataCon){
        panel.refresh()
        var pData=dataCon.getPlayerState();
        var x=120;
        var y=startH;
        var dH=60;
        var j=0;
        Object.keys(pData).forEach(function(name){
            scoreLabels[j].setText(pData[name]["score"])
            scoreLabels[j].draw(ctx);
            j++;
        });
        resources.draw(ctx);
        money.setText("Money:"+"$"+pData["Russian"]["money"]) //TODO: Make sure that this is not hardcoded to use a specific player name.
        money.draw(ctx);
    }
}

