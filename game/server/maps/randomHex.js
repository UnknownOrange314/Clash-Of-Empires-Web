/**
 * This will create a random map with hexagonal territories.
 */
function RandomHex(numPlayers){

    var width=800;
    var height=600;
    var hSize=100;
    this.generateMap=function(){

        var names=new Array("Russia","Turkey","France","England","Neutrals");
        //Add players
        var players=[];
        for(i=0;i<numPlayers;i++){
            var p=null;
            if(i<numPlayers-1){
                p=new Player(i,new Computer(),new MajorPower());
            }else{
                p=new Player(i,new NoAI("Minors"+i),new MinorPower());
            }
            p.setName(names[i]);
            players.push(p);
        }

        //TODO:Give the regions actual names.
        var regions=[];
        for(var i=0;i<8;i++){
            for(var j=0;j<6;j++){
                var x=hSize*i;
                if(x%2==1){
                    x+=hSize/2
                }
                var y=hSize*j;
                var reg=new Region(x,y,x,y-10);
                regions.push(reg);
                reg.setOwner(players[numPlayers-1]);
                players[numPlayers-1].addRegion(reg);

            }
        }



        var pNames=["France","British","Ottoman","Russian","Spain","Habsburg"];

        //Set borders.
        regions.forEach(function(reg1){
            regions.forEach(function(reg2){
                if(reg1.distance(reg2)<hSize*1.5&&reg1!=reg2){
                    reg1.addBorder(reg2);
                    reg2.addBorder(reg1);
                }
            });
        });


        //Give regions to each player
        var capitals= _.sample(regions,players.length);
        for(var j=0;j<players.length;j++){

            players[j].addRegion(capitals[j]);
            players[j].setCapital(capitals[j]);
        }

        var mapData={};
        mapData["regions"]=regions;
        mapData["players"]=players;
        return mapData
    }
}
