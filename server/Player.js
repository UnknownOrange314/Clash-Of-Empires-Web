function Player(pNum){

    var num=pNum;
    var armies={};
    var regions=[];
    var score=0;
    var name=""+num;

    this.setName=function(nm){
        name=nm;
    }
    this.addRegion=function(region){
        regions.push(region);
    }


    this.removeRegion=function(region){
        regions=regions.splice(regions.indexOf(region),1);
    }

    this.createArmy=function(region){
        armies[region.getX()+region.getY()]=0+Math.floor(Math.random()*7);
    }

    this.addTroops=function(region,tCount){
        armies[region.getX()+region.getY()]+=tCount;
    }

    this.removeTroops=function(region,tCount){
        armies[region.getX()+region.getY()]-=tCount;
    }

    this.getArmy=function(region){
        return armies[region.getX()+region.getY()];
    }

    this.buildTroop=function(region){
        armies[region.getX()+region.getY()]+=1;
    }

    this.fightArmy=function(enemy,region){
        armies[region.getX()+region.getY()]=armies[region.getX()+region.getY()]-Math.floor(enemy/2);
    }



    this.moveTroops=function(start,end,ct){
        this.removeTroops(start,ct);
        this.addTroops(end,ct);
    }

    this.getNum=function(){
        return num;
    }

    this.attack=function(tCount,dest){
        dest.getOwner().fightArmy(tCount,dest);
        if(dest.getOwner().getArmy(dest)<=0){
            dest.setOwner(this);

        }

    }

    this.AI=function(){
        for(var i=0;i<regions.length;i++){
            var reg=regions[i];
            var t=this.getArmy(reg);
            var enemy=[];
            var borders=reg.getBorders();
            for(var j=0;j<borders.length;j++){
                var e=borders[j];
                if(e.getOwner()!==this){
                    enemy.push(e);num
                }
            }
            for(var k=0;k<enemy.length;k++){
                var eReg=enemy[k];
                this.attack(t/enemy.length,eReg);
            }
        }
    }

    this.getScore=function(){
        return name+":"+score;
    }

    this.updateScore=function(){
        console.log("Hi");
        score+=regions.length;
    }

    this.getName=function(){
        return name;
    }

}