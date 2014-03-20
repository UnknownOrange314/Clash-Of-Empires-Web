/**
 * Contains utility functions for the game display.
 * @returns {{getGraphics: getGraphics, getCanvas: getCanvas}}
 * @constructor
 */
function Display(){

    return{
        getGraphics:function(){
            var canvas=document.getElementById("game");
            return canvas.getContext("2d");
        },
        getCanvas:function(){
            return document.getElementById("game");
        }
    }

}