 window.mapTests=function(){


    test("Map setup tests",function(){

        //Generate the map
        var mapGen=new RandomHex(1);
        var data=mapGen.generateMap();
        var regions=data["regions"];
        var players=data["players"];

        ok(Object.keys(regions).length>20,"We have created regions");
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
    })

    test("Game map tests",function(){

        var map=new GameManager(new RandomHex(1));
        ok(map.getRegionCount()>0,"Regions created");
        ok(map.getRegionCount()<999999,"Did not create too many regions");
        map.updateState()["regionStates"].forEach(function(state){
            if(isNaN(state["army"])){
                ok(0,"Army state is invalid");
            }
        });
        ok("Done updating")
    });

     /**
      * This test checks to see if the region borders are counted
      * correctly after the game is updated.
      */
     test("Region border count test",function(){
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
                 bCount+=reg.getBorders().size();
             })
             console.log(bCount+":"+90);
             if(bCount!=90){
                 ok(0,"Borders:"+bCount);
             }
         }
         ok(1,"Were regions borders counted correctly");
     })
 }
