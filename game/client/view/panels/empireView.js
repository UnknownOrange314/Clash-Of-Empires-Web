/**
 * This is responsible for showing information your performance and the performance of other players.
 * TODO:Make sure the label positions here are not hardcoded.
 * @param config The configuration file.
 * @param inList The event handler.
 * @param dataCon The object that represents the connection with the client.
 * @constructor
 */
function EmpireView(config,inList,dataCon){

    var h=1000;
    var w=200;
    var startH=150;

    var resources=new Label("Resources",40,400,24);
    var money=new Label("Money",70,440,14);
    var research=new Label("Research",70,480,14);
    var score=new Label("Score",50,80,40);

    var mapInfo=dataCon.exportGameInfo();

    var scoreLabels=Array();


    for(var i=0;i<mapInfo["numPlayers"];i++){
        y=150+60*i;
        scoreLabels.push(new Label("S",120,y,14));
    }

    var rCommands=new Label("Research",40,520,24);
    var y=840;
    var resLabels={};
    mapInfo["upgrades"].forEach(function(name){
        y=y-30;
        resLabels[name]=new Label(name,70,y);
    });

    var bx=50;
    var resButtons=Array();
    var yPos=540;
    var dY=45;

    mapInfo["upgrades"].forEach(function(name){
        resButtons.push(new Button(bx,yPos,name,inList.upgrade)); //Troops move faster.
        yPos+=dY;
    });

    /**
     * @param flags
     */
    var drawPanel=function(flags){

        var ctx=getCanvas(EmpireView.canvasName);
        ctx.fillStyle="#1A1D44";
        ctx.fillRect(0,0,w,1000);
        ctx.fillStyle="#000000";
        score.draw(ctx);
        var size=40;
        var xPos=20;
        var h=startH;
        var dH=60;
        ctx.fillStyle="#FFFFFF";
        ctx.font='16pt Calibri';
        var textIdx=0;
        for(var key in flags){
            var img=flags[key];
            ctx.fillText(key,xPos,h-10);
            ctx.drawImage(img,xPos,h,size,size*img.height/img.width);
            h+=dH;
            textIdx++;
        }
    }

    var ctx=getCanvas('score');
    loadFlags(config["FlagData"],drawPanel);
    var panel=new Panel(100,100,100,900,ctx);

    this.update=function(dataCon,data){
        var pData=data["playerData"];
        panel.refresh();
        var x=120;
        var y=startH;
        var dH=60;
        var j=0;
        Object.keys(pData).forEach(function(name){
            console.log(j+":"+scoreLabels.length);
            scoreLabels[j].setText(pData[name]["score"]);
            scoreLabels[j].draw(ctx);
            j++;
        });
        resources.draw(ctx);
        money.setText("Money: "+"$"+pData["Host"]["money"]); //TODO: Make sure that this is not hardcoded to use a specific player name.
        money.draw(ctx);
        research.setText("Research: "+pData["Host"]["research"]);
        research.draw(ctx);
        rCommands.draw(ctx);

        resButtons.forEach(function(btn){
            btn.draw(ctx);
        });

        var temp=pData["Host"];
        ctx.fillCol="#FFFFFF";

        mapInfo["upgrades"].forEach(function(name){
            resLabels[name].setText(name+":"+temp[name]);
            resLabels[name].draw(ctx);
        });
    }

    /**
     * This function handles click events.
     */
    $("#score").click(function(e){
        console.log("Research:"+e.pageX+":"+ e.pageY);
        var cData=transformClick(e,ctx);
        var x=cData[0]-1000; //TODO: Make sure this value is not hardcoded
        var y=cData[1]-200; //TODO: Make sure this value is not hardcoded.
        console.log(x+":"+y);

        //TODO: Create button object
        resButtons.forEach(function(btn){
            console.log("Checking button");
            btn.checkClick(x,y);
        });
    });
}
EmpireView.canvasName='score';