
test("Region test",function(){
    var reg=new Region(2,2,2);
    var p=new Player(1);
    reg.setOwner(p);
    ok(reg.getOwner()!=undefined);
    ok(reg.getRenderState()!==null,"Region can be rendered");
    ok(reg.getX()==2,"xPos:"+reg.getX());
    ok(reg.getY()==2,"yPos"+reg.getY());

    var reg2=new Region(2,3,2);
    ok(reg2.distance(reg)===1,"Testing region distance");
    reg.addBorder(reg2);
    reg2.addBorder(reg);
    ok(reg2.hasBorder(reg)===true,"Has border");
    ok(reg.hasBorder(reg2)===true,"Has border");
    ok(reg.getBorders().length===1,"Testing correct border count:");
    ok(reg2.getBorders().length===1,"Testing correct border count");
});

test("Region render state test",function(){
    var reg=new Region(2,2,2);
    var p=new Player(1);
    reg.setOwner(p);
    var renderState=reg.getRenderState();
    ok(renderState.getOwner()>-1&&renderState.getOwner()<10,"Testing owner");
    ok(renderState.getX()==2,"Correct xPos state");
    ok(renderState.getY()==2,"Correct yPos state");
});

test( "DataConnection test", function() {
    var dCon=new connectionManager();
    var data=dCon.getRegionStates();
    var rData=dCon.getMapInfo();
    ok(Object.keys(rData).length>0,"Region info size");
    ok( 1, "Passed!" );
});


asyncTest("Map setup tests",function(){

    $.ajax({
        url:'game/server/maps/europe/europe.json',
        dataType:"json",
        success:function(json){
            ok(1)

            var mapGen=new Europe(json);

            //Load the map data from a JSON file.

            //Generate the map
            var data=mapGen.generateMap();
            var regions=data["regions"];
            var players=data["players"];

            ok(Object.keys(regions).length>20,"We have created regions")
            players.forEach(function(player){
                ok(player!==null,"Checking if player is null");
            });
            regions.forEach(function(reg){
                if(reg===undefined){
                    ok(0,"Undefined region");
                }
                if(reg.getOwner()===null){
                    ok(0,"Null owner");
                }
                if(reg.getBorders().length===0){
                    ok(0,"No borders:"+reg.getName());
                }
            });

            start();
        }


    })

})

asyncTest("Game map tests",function(){

    $.getJSON('game/server/maps/europe/europe.json',function(json){
        var map=new GameManager(new Europe(json));
        ok(map.getRegionCount()>0,"Regions created");
        ok(map.getRegionCount()<999999,"Did not create too many regions");
        map.updateState()["regionStates"].forEach(function(state){
            if(isNaN(state["army"])){
                ok(0,"Army state is invalid");
            }
        });
        ok("Done updating")
         start();
    });

});

test("Point tests",function(){
    var p=new Point(1,1);
    ok(p.getX()===1,"Testing xPos");
    ok(p.getY()===1,"Testing yPos");

    var p2=new Point(1,1);
    ok(p.getDistance(p2)==0,"Testing distance to same location");

    var p3=new Point(2,1);
    ok(p.getDistance(p3)===1,"Testing distance");

    var p4=new Point(50,1);
    ok(p.getDistance(p4)==49,"Testing distance:"+ p.getDistance(p4));

    var p5=new Point(4,5);
    ok(p.getDistance(p5)===5,"Testing distance:"+ p.getDistance(p5));
});

test("Move test",function(){

    //Players cannot take over region because players cannot lose their last two regions.
    //Players take damage even when there are no troops in a region.
    var r0=new Region(200,200.1);
    var r1=new Region(0,0,1);
    var r2=new Region(100,100,1);
    var r3=new Region(3,3);
    var r4=new Region(4,4);

    var p1=new Player(1,new NoAI("P1"),new MajorPower());
    var p2=new Player(2,new NoAI("P2"),new MajorPower());

    r0.setOwner(p1);
    r1.setOwner(p1);
    r2.setOwner(p2);
    r3.setOwner(p2);
    r4.setOwner(p2);


    r0.addBorder(r1);
    r0.addBorder(r2);
    r1.addBorder(r0);
    r1.addBorder(r2);
    r2.addBorder(r0);
    r2.addBorder(r1);

    p1.addTroops(r0,50);
    p1.addTroops(r1,500);
    p2.addTroops(r2,100);

    ok(p1.getArmy(r0)===50);
    ok(p1.getArmy(r1)===500,"Army size:"+p1.getArmy(r1));
    ok(p1.getArmy(r2)===0,"Army size in r2:"+p1.getArmy(r2));
    ok(p2.getArmy(r2)===100,"Army size:"+p2.getArmy(r2));

    var move=new MoveCommand(r1,r2);
    var max=999;
    while(r2.getOwner()!==p1&&(max>-1)){
        if(max===0){
            ok(0,"Taking too long");
        }
        max--;
        move.execute(p1);

    }
    ok(r1.getOwner()===p1,"Player still has old region");

    move.execute(p1);
    ok(p1.getArmy(r1)<500,"Army size:"+p1.getArmy(r1));
    ok(p1.getArmy(r1)>10,"Army size:"+p1.getArmy(r1));
    ok(p1.getArmy(r2)>0,"Size of army in conquered region:"+p1.getArmy(r2));
    ok(p2.getArmy(r2)===0,"Army size"+p2.getArmy(r2));

    //Make sure region borders are not being modified.
    for(var i=0;i<10;i++){
        p1.updateState();
        p2.updateState();
        if(r0.getBorders().length!==2){
            ok(0,"Invalid borders");
        }
        if(r1.getBorders().length!==2){
            ok(0,"Invalid borders");
        }
        if(r2.getBorders().length!==2){
            ok(0,"Invalid borders");
        }
    }

});

test("Attacking capital test",function(){
    var map=new GameManager(new TestGen());
    var players=map.getPlayers();
    var regions=map.getRegions();
    var r1=players[0].getCapital();
    var aReg=regions[7];

    var move=new MoveCommand(aReg,r1);
    players[0].addTroops(r1,9999);
    aReg.getOwner().addTroops(aReg,9999);

    ok(1,aReg.getOwner()!=players[0]);
    for(var i=0;i<20;i++){
        move.execute(aReg.getOwner());
    }
    var aOwn=aReg.getOwner();
    var c1=aOwn.getArmy(aReg);
    var c2=players[0].getArmy(r1);
    ok(c1<c2,"Troop counts "+c1+":"+c2);



});


test("AI Tests",function(){
    var map=new GameManager(new TestGen());

    var oStr="";
    var regionCount=0;
    var players=map.getPlayers();
    players.forEach(function(p){
        oStr=oStr+":"+ p.countRegions();
        regionCount+= p.countRegions();
    });

    for(var i=0;i<9;i++){
        map.updateState();
        var regions=map.getRegions();
        var bCount=0;
        regions.forEach(function(reg){
            bCount+=reg.getBorders().length;
        })
        if(bCount!=180){
            ok(0,"Borders:"+bCount);
        }
    }


    var regionCount2=0;
    var players=map.getPlayers();
    players.forEach(function(p){
        regionCount2+= p.countRegions();
    });

    if(regionCount!=regionCount2){
        ok(0,regionCount+":"+regionCount2);
    }
    var data=map.updateState();
    ok(data["moveCommands"]["0"].length>0,JSON.stringify(data["moveCommands"]));



    ok(1,"AI is working");
});

/**
 * This test to see if a player can issue a move command and have trops move.
 */
asyncTest("Player move command test",function(){

    $.getJSON('game/server/maps/europe/europe.json',function(json){


        var map=new GameManager(new Europe(json));
        map.registerPlayer("host");
        map.processClick(new Point(226,346),"host");
        map.processClick(new Point(248,302),"host");

        var data=map.updateState();
        console.log("Data:"+JSON.stringify(data["moveCommands"]))
        ok(data["moveCommands"].hasOwnProperty("host"),"Has host data been sent?");
        ok((data["moveCommands"]["host"]).length===1,"Move data:"+JSON.stringify(data["moveCommands"]["host"]));

        console.log("Start:")
        ok(1,"Done testing move commands")
        start();


    });

});

/**
 * This method tests if the game is running fast enough
 */

asyncTest("Speed Test",function(){
    $.getJSON('game/server/maps/europe/europe.json',function(json){

        var map=new GameManager(new Europe(json));

        var st=new Date().getTime();

        var cycles=100;
        for(var i=0;i<cycles;i++){
            map.updateState();
            console.log("Updating")
        }
        var end=new Date().getTime();
        var time=end-start;
        console.log("Done")
        ok(time<10*cycles,"Time "+(end-st));
        ok(1);
        start();
    });
});

test("Math Test",function(){
    var a1=findAngle(1,0)
    ok(a1==0,"Angle:"+a1)

    var a2=findAngle(0,1)
    ok(a2==Math.PI/2,"Angle:"+a2)

    var a3=findAngle(-1,0)
    ok(a3==Math.PI,"Angle:"+a3)

    var a4=findAngle(0,-1)
    ok(a4==Math.PI*3/2,"Angle:"+a4)

    var a5=findAngle(-1,1)
    ok(a5==Math.PI*3/4,"Angle:"+a5)
});
