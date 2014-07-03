
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

test("Speed Test",function(){

        var map=new GameManager(new RandomHex(5));

        var st=new Date().getTime();

        var cycles=100;
        for(var i=0;i<cycles;i++){
            map.updateState();
        }
        var end=new Date().getTime();
        var time=end-start;
        ok(time<10*cycles,"Time "+(end-st));
        ok(1);

});

mathTests();

