/**
 * Created by Gulu on 3/28/14.
 */
function InputListener(dCon,mapDisplay){

    var dataCon=dCon;
    var layers=[];

    this.addLayer=function(layer){
        layers.push(layer);
    }

    this.zoomIn=function(){
        var info=dataCon.exportMapInfo();
        layers.forEach(function(layer){
            layer.zoomIn(info)
        });
    }

   this.zoomOut=function(){
        var info=dataCon.exportMapInfo();
        layers.forEach(function(layer){
            layer.zoomOut(info)
        });
    }

    this.slowRender=function(){
        mapDisplay.slowRender();
    }

    this.speedRender=function(){
        mapDisplay.speedRender();
    }

    this.upgradeMovement=function(){
        dataCon.researchCommand("movement");
    }

    this.upgradeInfrastructure=function(){
        dataCon.researchCommand("infrastructure");
    }

    this.upgradeFarming=function(){
        dataCon.researchCommand("farming");
    }

    this.upgradeDefense=function(){
        dataCon.researchCommand("defense");
    }

    var list=this;

    window.onkeyup=function(e){
        var key= e.keyCode ? e.keyCode: e.which;
        var info=dataCon.exportMapInfo();
        console.log("Key:"+key);
        if(InputListener.zoomOut==key){
            list.zoomOut();
        }
        if(InputListener.zoomIn==key){
            list.zoomIn();
        }

        //Q and E keys for adjusting speed
        if(key==69){
            mapDisplay.slowRender();
        }

        if(key==81){
            mapDisplay.speedRender();
        }

        if(key==82){
            dataCon.upgradeCommand("Market");
        }

        if(key==84){
            dataCon.upgradeCommand("University");
        }

        if(key==89){
            dataCon.upgradeCommand("Barracks")
        }



    }
}

InputListener.right=68;
InputListener.left=65;
InputListener.down=83;
InputListener.up=87;
InputListener.zoomOut=88;
InputListener.zoomIn=90;
