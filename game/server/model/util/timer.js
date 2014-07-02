function Timer(){
    var start = new Date().getTime();
    this.getTime = function() {
        var cur;
        cur = (new Date).getTime();
        return cur - start;
    }
}