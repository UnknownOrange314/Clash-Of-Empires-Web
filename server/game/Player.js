




function Player(num,ai){

    var minorPower=false;

    var army=new ArmyData()

    var regions={};
    var score=0;
    var name=""+num;
    var capital=null;
    var moveCommands=[];


    this.powerStatus=function(){
        return minorPower
    }
    this.isMinor=function(minor){
        minorPower=minor;
    }
    /**
     * The attack power of a player when attacking from a region.
     * @param reg
     */
    this.getAttackPower=function(reg){
        return army.getAttackPower(reg)
    }

    /**
     * The defense power of a player when defending a region.
     * @param reg
     */
    this.getDefendPower=function(reg){

        var dBonus=1.0;
        if(this.getCapital()===reg){
            dBonus=15.0;
        }
        return dBonus*Math.min(this.getArmy(reg),2);
    }


    this.exportMoveCommands=function(){
        var data=moveCommands.map(function(command){
            var p1=command.start().getLocation();
            var p2=command.end().getLocation();
            var arr={};
            arr["x1"]=p1.getX();
            arr["y1"]=p1.getY();
            arr["x2"]=p2.getX();
            arr["y2"]=p2.getY();
            arr["conflict"]=command.hasConflict()
            return arr;
        });
        return data;
    }
    this.addMoveCommand=function(s,e){
        moveCommands.push(new MoveCommand(s,e));
    }
    this.getMoveCommands=function(){
        return moveCommands;
    }
    this.setCapital=function(cap){
        capital=cap;
    }
    this.getCapital=function(){
        return capital;
    }
    this.setName=function(nm){
        name=nm;
    }
    this.addRegion=function(region){
        regions[region.hashCode()]=region;
    }

    this.countRegions=function(){
        return Object.keys(regions).length;
    }
    this.getRegions=function(){
        return regions;
    }

    this.moveTroops=function(r1,r2,mv){
        var ct=Math.min(this.getArmy(r1),mv);
        this.removeTroops(r1,ct);
        this.addTroops(r2,mv);
    }


    this.removeRegion=function(region){
        delete regions[region.hashCode()];
    }

    this.createArmy=function(region){
        army.createArmy(region)
    }

    this.addTroops=function(region,tCount){
        army.addTroops(region,tCount)
    }

    this.removeTroops=function(region,tCount){
        army.removeTroops(region,tCount)
    }

    this.getArmy=function(region){
        return army.getArmy(region)
    }

    this.buildTroop=function(region){

        var bCount=1;
        if(minorPower===false){
            if(region===this.getCapital()){
                bCount=20-army.getSize()/1000.0000;
            }

        }

        army.addTroops(region,Math.floor(bCount))
    }

    this.moveTroops=function(start,end,ct){
        this.removeTroops(start,ct);
        this.addTroops(end,ct);
    }

    this.getNum=function(){
        return num;
    }

    this.updateAI=function(){
        moveCommands=ai.run(this);
    }

    this.updateState=function(){
        var player=this;
        moveCommands.forEach(function(command){
            command.execute(player);
        });
        Object.keys(regions).forEach(function(rLoc){
            regions[rLoc].heal();
        });
        this.updateScore();
    }

    /**
     * Returns the AI function that the player is using.
     */
    this.getAI=function(){
        return ai;
    }

    this.setAI=function(AiFunc){
        ai=AiFunc;
    }



    this.getScore=function(){
        return score;
    }

    this.updateScore=function(){
        score+=Object.keys(regions).length;
    }

    this.getName=function(){
        return name;
    }

}