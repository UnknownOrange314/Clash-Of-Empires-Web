window.commandTests=function(){
    /**
     * This test to see if a player can issue a move command and have troops move.
     */
    test("Player move command test",function(){

        var map=new GameManager(new SandboxGen(6));
        map.registerPlayerClicks("host");
        map.processClick(new Point(40,40),"host");
        map.processClick(new Point(150,150),"host");

        var data=map.updateState();
        console.log("Data:"+JSON.stringify(data["moveCommands"]))
        ok(data["moveCommands"].hasOwnProperty("host"),"Has host data been sent?");
        ok((data["moveCommands"]["host"]).length===1,"Move data:"+JSON.stringify(data["moveCommands"]["host"]));

        ok(1,"Done testing move commands")

    });
}
