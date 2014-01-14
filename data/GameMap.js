function GameMap(){

    this.regions=[];
    for(var x=0;x<900;x+=50){
        for(var y=0;y<500;y+=50){
            this.regions.push(new Region(x,y,50));
        }
    }

    for(var i=0;i<this.regions.length;i++){
        for(var j=0;j<this.regions.length;j++){
            if(i!==j){
                if(this.regions[i].distance(this.regions[j])<50){
                    this.regions[i].addBorder(this.regions[j]);
                    this.regions[j].addBorder(this.regions[i]);
                }
            }
        }
    }

    this.updateState=function(){



        return this.regions.map(function(region){
           return region.getRenderState();
        });
    }

    this.getRegionCount=function(){
        return this.regions.length;
    }

}
