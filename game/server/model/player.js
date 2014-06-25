function MinorPower(){
    this.status=function(){
        return false;
    }

    this.getBuildCount=function(reg,player){
        return 1;
    }


    this.getDefense=function(player,reg){
        return 1.0;
    }
}

function MajorPower(){

    this.status=function(){
        return true;
    }

    this.getBuildCount=function(player,reg){
        var mul=reg.getRecruitment();
        if(reg===player.getCapital()){
            return 20.0*mul;
        }
        return 1.0*mul;
    }

    this.getDefense=function(player,reg){
        if(reg==player.getCapital()){
            return 20;
        }
        return 1;
    }
}

function Player(num,ai,pStatus){

    var myMoney=0;
    var myResearch=0;
    var powStatus=pStatus
    var army=new ArmyData()

    var regions=new HashSet(function(reg){
        return reg.hashCode();
    });

    var score=0;
    var name=""+num;
    var capital=null;

    //Move commands for a player. There can only be one move command per player between regions.
    var moveCommands=new HashSet(function(com){
        return com.hashCode()
    })

    /**
     *
     * @returns {*} boolean indicating if the player is a minor power.
     */
    this.powerStatus=function(){
        return powStatus.status()
    }

    /**
     *
     * @returns {*} Information about a player's power status.
     */
    this.getPowerData=function(){
        return powStatus;
    }

    this.isMinor=function(minor){
        if(minor==true){
            powStatus=new MinorPower();
        }else{
            powStatus=new MajorPower();
        }
    }
    
    /**
     * The attack power of a player when attacking from a region.
     * @param reg
     */
    this.getAttackPower=function(reg){
        return army.getAttackPower(reg)*(1+dRes);
    }

    /**
     * The defense power of a player when defending a region.
     * @param reg
     */
    this.getDefendPower=function(reg){
        var dBonus=powStatus.getDefense(this,reg)*(1+dRes);
        return dBonus*Math.min(this.getArmy(reg),2);
    }

    this.exportMoveCommands=function(){
        var data=[]
        moveCommands.forEach(function(command){
            var p1=command.getStart().getLocation();
            var p2=command.getEnd().getLocation();
            var arr={};
            arr["sCity"]=command.getStart().getName()
            arr["eCity"]=command.getEnd().getName()
            arr["x1"]=p1.getX();
            arr["y1"]=p1.getY();
            arr["x2"]=p2.getX();
            arr["y2"]=p2.getY();
            arr["conflict"]=command.hasConflict()
            data.push(arr)
        });
        return data;
    }

    this.addMoveCommand=function(s,e){
        moveCommands.add(new MoveCommand(s,e))
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
        regions.push(region)
    }

    this.removeRegion=function(region){
        regions.remove(region);
    }

    this.countRegions=function(){
        return regions.size();
    }

    this.getRegions=function(){
        return regions;
    }

    //TODO: Consider adding a unit test to make sure that this works properly
    this.moveTroops=function(r1,r2,maxSpeed){
        var moveNum=Math.min(this.getArmy(r1),maxSpeed);
        this.removeTroops(r1,moveNum);
        this.addTroops(r2,moveNum);
    }


    this.removeRegion=function(region){
        regions.remove(region)
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
        var bCount=powStatus.getBuildCount(this,region);
        army.addTroops(region,bCount)
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

        regions.forEach(function(reg){
            reg.heal();
            myMoney+=reg.getResources();
            myResearch+=reg.getResearch();
        });
        myMoney-=army.getSize()*0.0001;

        //Subtract money for troop costs.
        this.update();
    }

    /**
     * Remove money in order to pay for somehing.
     * @param cost
     */
    this.subtractCost=function(cost){
        myMoney-=cost/(1+iRes); //Reduce cost by infrastructure.
    }
    this.getMoney=function(){
        return myMoney;
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

    this.update=function(){
        score+=regions.size();
    }

    this.setName=function(nm){
        name=nm
    }

    this.getName=function(){
        return name;
    }

    //TODO: Find a way to implement this without creating a new object.
    this.hasMoveCommand=function(r1,r2){
        var c=new MoveCommand(r1,r2)
        return moveCommands.contains(c)
    }

    //TODO: Find a way to implement this without creating a new object.
    this.removeMoveCommand=function(r1,r2){
        var c=new MoveCommand(r1,r2)
        moveCommands.remove(c)
    }

    var mRes=1;
    var iRes=1;
    var fRes=1;
    var dRes=1;

    /**
     * This function exports data about the player state.
     */
    this.exportState=function(){
        var pData={};
        pData["score"]=this.getScore();
        pData["money"]=Math.round(myMoney);
        pData["num"]=this.getNum();
        pData["research"]=Math.round(myResearch);
        pData["mRes"]=mRes;
        pData["iRes"]=iRes;
        pData["fRes"]=fRes;
        pData["dRes"]=dRes;
        return pData
    }

    this.upgrade=function(uName){

        console.log("Upgrade:"+uName);
        if(uName=="movement"){
            var c=Math.pow(2,mRes)*10
            if(c<myMoney){
                console.log("Move research upgrading:"+mRes);
                mRes++;
                this.subtractCost(c);
            }
        }
        if(uName=="infrastructure"){
            var c=Math.pow(2,iRes*10);
            if(c<myMoney){
                iRes++;
                this.subtractCost(c);
            }
        }
        if(uName=="farming"){
            var c=Math.pow(2,fRes*10);
            if(c<myMoney){
                fRes++;
                this.subtractCost(c);
            }
        }
        if(uName=="defense"){
            var c=Math.pow(2,dRes*10);
            if(c<myMoney){
                dRes++;
                this.subtractCost(c);
            }
        }
    }

    this.speedMul=function(){
        return 1+mRes;
    }

    //Pop cap mul
    this.getCapMul=function(){
        return 1+fRes;
    }
}
