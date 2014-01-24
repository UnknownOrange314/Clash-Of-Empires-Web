/**
 * This is used to process input.
 * @param canvas The HTML5 canvas with the display.
 * @param topX The x position at the top right of the drawing area.
 * @param topY The y position at the top left of the drawing area.
 * @param dataCon The object that is used to communicate with the server.
 * @constructor
 */
function Inputs(canvas,topX,topY,dataCon){

	canvas.addEventListener("click",processClick,false);

    /**
     * Process a click.
     * @param e Click event data.
     */
	function processClick(e){
		var x=e.pageX;
		var y=e.pageY;
        dataCon.sendClick(new Point(x,y));
	}

};