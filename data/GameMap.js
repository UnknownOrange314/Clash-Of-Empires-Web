function GameMap(){

    var regions=[];
    for(var x=0;x<900;x+=50){
        for(var y=0;y<500;y+=50){
            regions.push(new Region(x,y,50));
        }
    }

    this.players=[];
    for(var i=1;i<4;i++){
        var p=new Player(i);
        this.players.push(p);
        for(var j=0;j<regions.length;j++){
            var reg=regions[j];
            p.createArmy(reg);
        }
    }

    //Randomly shuffle regions
    for(var s=0;s<99;s++){
        var s1=Math.floor(Math.random()*regions.length);
        var s2=Math.floor(Math.random()*regions.length);
        var temp=regions[s1];
        regions[s1]=regions[s2];
        regions[s2]=temp;
    }

    for(var i=0;i<regions.length;i++){
        var pInd=i%this.players.length;
        regions[i].setOwner(this.players[pInd]);
    }

    for(var i=0;i<regions.length;i++){
        for(var j=0;j<regions.length;j++){
            if(i!==j){
                if(regions[i].distance(regions[j])<75){
                    regions[i].addBorder(regions[j]);
                    regions[j].addBorder(regions[i]);
                }
            }
        }
    }

    this.updateState=function(){

        //Perform AI actions.
        this.players.forEach(function(player){
            player.AI();
        });

        //Build troops for each region
        regions.forEach(function(region){
            region.buildTroop();
        });

        return regions.map(function(region){
           return region.getRenderState();
        });
    }

    this.getRegionCount=function(){
        return regions.length;
    }
}
