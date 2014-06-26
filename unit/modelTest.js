
hashSetTests();
mapTests();
regionTests();
pointTests();
dataConnectionTest();
playerTests();
moveTest();
aiTests();
commandTests();

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

mathTests();

