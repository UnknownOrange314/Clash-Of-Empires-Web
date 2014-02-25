/**
 * Starts the client.
 * @param dataConnection The object that will be used to get game state data to render.
 * @param pNum The player name.
 */
function startClient(dataConnection,pName){



    var dataCon=dataConnection;
    dataCon.registerPlayer(pName);

    //This is the main loop of the game
    var mapImg=new Image();
    mapImg.onload=function(){
        var bg=new Image(); //Load background image for menu
        bg.onload=function(){
            var disp=new MapDisplay(250,100,mapImg,dataCon,bg,pName);
            setInterval(disp.gameLoop,40);
        }
        bg.src='images/background.jpg';
    }
    mapImg.src='images/map.png';


}

startClient(new LocalConnection(),"Host");
