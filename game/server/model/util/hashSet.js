/**
 * Basic hash set implementation.
 * @param hFun The hash function that will be used.
 * @constructor
 */
function HashSet(hFun){

    var hash=hFun;
    var data={};
    var size=0;

    this.push=function(item){
        var hashCode=hash(item);
        if((hashCode in data)==false){
            size++;
        }
        data[hashCode]=item;
    }

    this.remove=function(item){
        var hashCode=hash(item);
        if((hashCode in data)==true){
            size--;
        }
        delete data[hashCode];
    }

    this.contains=function(item){
        var hashCode=hash(item);
        return hashCode in data;
    }

    this.exportArray=function(){
        var arrData=[];
        Object.keys(data).forEach(function(key){
            arrData.push(data[key])  ;
        });
        return arrData;
    }

    this.forEach=function(anon){
        this.exportArray().forEach(anon)
    }

    this.size=function(){
        return size;
    }
}
