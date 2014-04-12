/**
 * This is responsible for showing information about the performance of players.
 * TODO:Make sure the label positions here are not hardcoded.
 * @param config The configuration file
 * @param inListener The event handler.
 * @constructor
 */
function ScoreView(config,inList){

    var h=1000;
    var w=200;
    var startH=150;

    var resources=new Label("Resources",40,400,24);
    var money=new Label("Money",70,440,14); //Label to indicate research.
    var research=new Label("Research",70,480,14);

    var score=new Label("Score",50,80,40);

    var resources=new Label("Resources",40,400,24);

    var scoreLabels=Array();
    for(var i=0;i<4;i++){
        y=150+60*i
        scoreLabels.push(new Label("S",120,y,14));
    }


    var rCommands=new Label("Research",40,520,24);

    var mRes=new Label("Economy Research",70,810);
    var iRes=new Label("Economy Research",70,840);
    var fRes=new Label("Economy Research",70,770);
    var dRes=new Label("Economy Research",70,740);

    var bx=50;
    var resButtons=Array();
    var yPos=540;
    var dY=45;
    resButtons.push(new Button(bx,yPos,"Movement",inList.upgradeMovement)); //Troops move faster.
    yPos+=dY;
    resButtons.push(new Button(bx,yPos,"Infrastructure",inList.upgradeInfrastructure)); //Improvements cheaper.
    yPos+=dY;
    resButtons.push(new Button(bx,yPos,"Farming",inList.upgradeFarming)); //Higher max region wealth.
    yPos+=dY;
    resButtons.push(new Button(bx,yPos,"Defense",inList.upgradeDefense)); //Hit points regenerate faster.



    /**
     * TODO
     * -Show buttons on interface.
     * -When user clicks on buttons, do research if possible.
     */


    /**
     * @param flags
     */
    var drawPanel=function(flags){

        var ctx=getCanvas(ScoreView.canvasName);
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
    var panel=new Panel(100,100,100,900,ctx);

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
        money.setText("Money: "+"$"+pData["Host"]["money"]) //TODO: Make sure that this is not hardcoded to use a specific player name.
        money.draw(ctx);
        research.setText("Research: "+pData["Host"]["research"]);
        research.draw(ctx);

        rCommands.draw(ctx);

        resButtons.forEach(function(btn){
            btn.draw(ctx);
        })

        var temp=pData["Host"];
        ctx.fillCol="#FFFFFF";


        mRes.setText("Movement:"+temp["mRes"])
        iRes.setText("Infrastructure:"+temp["iRes"])
        fRes.setText("Farming:"+temp["fRes"]);
        dRes.setText("Combat:"+temp["dRes"]);
        mRes.draw(ctx);
        iRes.draw(ctx);
        fRes.draw(ctx);
        dRes.draw(ctx);
        //eL.draw(ctx);
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
            console.log("Checking button")
            btn.checkClick(x,y);
        });


    });
}
ScoreView.canvasName='score';

