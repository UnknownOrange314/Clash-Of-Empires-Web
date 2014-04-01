/**
 * Created by Gulu on 3/28/14.
 */
function KeyListener(dCon,svgView,symbolView,dataView){

    var dataCon=dCon;

    var layers=[];

    layers.push(svgView);
    layers.push(symbolView);
    layers.push(dataView);

    window.onkeyup=function(e){
        var key= e.keyCode ? e.keyCode: e.which;
        var info=dataCon.getMapInfo();
        if(key==90){
            layers.forEach(function(layer){
                layer.zoomIn(info);
            });
        }
        if(key==88){
            layers.forEach(function(layer){
               layer.zoomOut(info);
            });
        }

        if(key==87){ //Up
            layers.forEach(function(layer){
                layer.translate(0,-5,info);
            });
        }

        if(key==83){ //Down
            layers.forEach(function(layer){
                layer.translate(0,5,info);
            });
        }

        if(key==65){ //Left
            layers.forEach(function(layer){
                layer.translate(-5,0,info);
            });
        }

        if(key==68){ //Right
            layers.forEach(function(layer){
                layer.translate(5,0,info);
            });
        }
    }
}
