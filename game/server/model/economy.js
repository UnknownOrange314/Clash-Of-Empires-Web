/**
 * This class represents an economy for a region.
 * @constructor
 */
function Economy(){

    var population=Economy.startPopulation;

    //Upgrade statistics.
    var trade=1;
    var barracks=1;
    var research=1;

    this.upgradeMarket=function(){
        trade++;
    }

    this.upgradeResearch=function(){
        research++;
    }

    this.upgradeBarracks=function(){
        barracks++;
    }

    this.getResearchCost=function(){
        return 100*Math.pow(2,research);
    }

    this.getBarracksCost=function(){
        return 20*Math.pow(2,barracks);
    }

    this.getTradeCost=function(){
        return 5*Math.pow(2,trade);
    }

    /**
     *
     * @param mMul Multiplier for max pop
     */
    this.growPopulation=function(mMul){
        population=population+Economy.growthRate*population*(1-population/(mMul*Economy.maxPopulation));
    }

    this.getTax=function(){
        return population*Economy.baseTax*(1+0.2*trade);
    }

    this.getBarracks=function(){
        return barracks;
    }

    this.getResearch=function(){
        return research;
    }

    this.getTrade=function(){
        return trade;
    }

    this.getPopulation=function(){
        return population;
    }

    this.exportState=function(){
        var data={};
        data["population"]=parseInt(this.getPopulation());
        data["tax"]=parseInt(this.getTax()*1000)/1000;
        data["economy"]=this.getTrade();
        data["research"]=this.getResearch();
        data["barracks"]=this.getBarracks();
        return data;
    }


}

Economy.startPopulation=1000000;
Economy.maxPopulation=2*Economy.startPopulation;
Economy.growthRate=0.001; //The rate of growth during each cycle.
Economy.baseTax=1/1000000; //The amount of getTax that each person will give.