/**
 * This is used to process input.
 * @param canvas The HTML5 canvas with the display.
 * @param topX The x position at the top right of the drawing area.
 * @param topY The y position at the top left of the drawing area.
 * @param dataCon The object that is used to communicate with the server.
 * @param pName The player number that is associated with this input.
 * @constructor
 */
function Inputs(canvas,topX,topY,dataCon,pName){

	canvas.addEventListener("click",processClick,false);

    /**
     * This method gets the cursor position of a mouse click.
     * @param e
     * @returns {*[]}
     */
    function getCursorPosition(e) {
        var x;
        var y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        // Convert to coordinates relative to the canvas
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        return [x,y]
    }
    /**
     * Process a click.
     * @param e Click event data.
     */
	function processClick(e){
        var pt=getCursorPosition(e);
		var x=pt[0];
		var y=pt[1];
        dataCon.sendClick(new Point(x-topX,y-topY),pName);
	}

};