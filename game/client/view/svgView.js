/**
 * This class is responsible for rendering SVG data.
 * @param pN The player that is associated with the display.
 * @constructor
 */
function SvgView(pN,cData,lConf){

    var pName=pN
    var colorData=cData
    var labelConfig=lConf
    var displayCache=new DisplayCache()//This is for improving rendering speed.
    var clickReg=null

    this.drawRegions=function(imgData,data,renderCont,dataCon){
        renderCont.find("#game").prepend(imgData)
        Object.keys(data).forEach(function(reg){
            var rData=data[reg]
            var svg=d3.select("svg")
            svg.selectAll("text#"+reg)
                .attr("x",rData["x"])
                .attr("y",rData["y"])
                .attr("fill",labelConfig["fill"])
                .attr("transform","translate(10,20)")
                .attr("font-size",labelConfig["font-size"])
                .attr("font-weight",labelConfig["font-weight"])
            svg.selectAll("path#"+reg)
                .attr("stroke-width",2)
                .attr("transform","scale(0.25)")
                .on("click",function(d,i){console.log(d+":"+i+"  "+reg); dataCon.sendClick(reg,pName)      })
        });
    }

    this.showOwners=function(gameState){
        var svg=d3.select("svg")
        gameState["regionStates"].map(function(state){
            svg.selectAll("path#"+state["name"])
                .attr("fill",colorData[state["owner"]])
            displayCache.updateReg(state["name"],state["owner"])
            svg.selectAll("text#"+state["name"])
                .text(state["army"])
        });
        while(displayCache.hasUpdates()){
            var update=displayCache.getUpdate()
            svg.selectAll("path#"+update["name"])
                .attr("fill",colorData[update["owner"]])
        }
    }

    this.showClick=function(gameState,dataCon){
        var svg=d3.select("svg")
        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick()
        gameState["regionStates"].map(function(state){ //Restore old color.
            if(state["name"]==clickReg){
                svg.selectAll("path#"+state["name"])
                    .attr("fill",colorData[state["owner"]])
            }
        })
        clickReg=clickData
        svg.selectAll("path#"+clickData)//Color other region.
            .attr("fill","white")
    }

    this.showScore=function(dataCon){
        var pData=dataCon.getPlayerState()
        var svg=d3.select("svg")
        Object.keys(pData).forEach(function(name){
            svg.selectAll("text#Score_"+pData[name]["num"])
                .text(name+" Empire:"+pData[name]["score"])
        });

    }
}