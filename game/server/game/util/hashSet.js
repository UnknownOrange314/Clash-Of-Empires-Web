/**
 * Created by Gulu on 3/26/14.
 */

/**
 * Basic hash set implementation.
 * @param hFun The hash function that will be used.
 * @constructor
 */
function HashSet(hFun){

    var hash=hFun;
    var data={};
    var size=0;

    this.add=function(item){
        if((item in data)==false){
            size++;
        }
        var hashCode=hash(item);
        data[hashCode]=item;
    }

    this.remove=function(item){
        if((item in data)==true){
            size--;
        }
        var hashCode=hash(item);
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
