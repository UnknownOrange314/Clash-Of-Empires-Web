/**
 * This generates a test map with multiple players
 * @constructor
 */
function TestGen(){
    this.generateMap=function(){
        var pNum=4;
        var regions=[];
        for(var i=0;i<10;i++){
            regions.push(new Region(i*20,i*20,20));
        }
        var players=[];
        for(i=0;i<pNum;i++){
            players.push(new Player(i,new Computer(),new MajorPower()));
        }
        var j=0;
        regions.forEach(function(r1){
            regions.forEach(function(r2){
                if(r1!=r2){
                    r1.addBorder(r2);
                    r2.addBorder(r1);
                }
            });
            r1.setOwner(players[(j%pNum)]);
            if(j>5){
                players[(j%pNum)].setCapital(r1);
            }
            j++;
        });
        var data={};
        data["regions"]=regions;
        data["players"]=players;
        return data;
    }
}

/**
 * Generates a map where all the regions are owned by one player
 * @constructor
 */
function SandboxGen(){
    this.generateMap=function(){
        var pNum=1;
        var regions=[];
        for(var i=0;i<10;i++){
            regions.push(new Region(i*20,i*20,20));
        }
        var players=[];
        players.push(new Player(0,new Computer(),new MajorPower()));

        var j=0;
        regions.forEach(function(r1){
            regions.forEach(function(r2){
                if(r1!=r2){
                    r1.addBorder(r2);
                    r2.addBorder(r1);
                }
            });
            r1.setOwner(players[0]);
            if(j>5){
                players[(j%pNum)].setCapital(r1);
            }
            j++;
        });
        var data={};
        data["regions"]=regions;
        data["players"]=players;
        return data;
    }

}
