window.dataConnectionTest=function(){

    test( "DataConnection test", function() {
        var dCon=new LocalConnectionManager();
        var data=dCon.getRegionStates();
        var rData=dCon.exportGameInfo();
        ok(Object.keys(rData).length>0,"Region info size");
        ok( 1, "Passed!" );
    });
}
