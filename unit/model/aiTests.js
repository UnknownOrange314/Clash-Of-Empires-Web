window.aiTests=function(){
    test("AI Tests",function(){

        var map=new GameManager(new TestGen());

        var oStr="";
        var regionCount=0;
        var players=map.getPlayers();
        players.forEach(function(p){
            oStr=oStr+":"+ p.countRegions();
            regionCount+= p.countRegions();
        });



        var regionCount2=0;
        var players=map.getPlayers();
        players.forEach(function(p){
            regionCount2+= p.countRegions();
        });

        if(regionCount!=regionCount2){
            ok(0,regionCount+":"+regionCount2);
        }
        for(var i=0;i<999;i++){
            map.updateState();
        }
        var data=map.updateState();
        ok(data["moveCommands"]["0"].length>0,JSON.stringify(data["moveCommands"]));
        ok(1,"This test is broken!");
    });
}
