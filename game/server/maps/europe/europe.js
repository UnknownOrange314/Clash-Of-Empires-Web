


function Europe(data){

    var json=data; //Map data.

    this.createRegions=function(){

        var rTemp={};
        for(var part in (json)){

            if(part==="borders"){

            }else{
                for(var i=0;i<(json[part]).length;i++){
                    var rName=json[part][i]["name"]
                    var path="images/"+part+"/"+rName+".svg"
                    var x=json[part][i]["x"]
                    var y=json[part][i]["y"]
                    var aX=json[part][i]["aX"]
                    var aY=json[part][i]["aY"]

                    rTemp[rName]=new Region(parseInt(x),parseInt(y),parseInt(aX),parseInt(aY),rName,path)
                }
            }

        }
        return rTemp;
    }

    this.createPlayers=function(rTemp){
        var players=[];
        for(var i=1;i<9;i++){
            var p=null;
            if(i>4){//Create human player.
                p=new Player(i,new NoAI("Minors"+i),new MinorPower());
            }
            else{
                p=new Player(i,new Computer(),new MajorPower());
            }
            players.push(p);
        }
        for(i=0;i<rTemp.length;i++){
            rTemp[i].setOwner(players[7]);
        }
        players[0].setName("France");
        players[0].setCapital(rTemp["Paris"]);

        players[1].setName("British");
        players[1].setCapital(rTemp["England"]);

        players[2].setName("Ottoman");
        players[2].setCapital(rTemp["Turkey"]);


        players[3].setName("Russian");
        players[3].setCapital(rTemp["Moscow"]);


        players[4].setName("Spain");
        players[4].setCapital(rTemp["Norway"]);


        players[5].setName("Habsburg");
        players[5].setCapital(rTemp["Norway"])

        players[6].setName("Germany");
        players[6].setCapital(rTemp["Norway"])

        players[7].setName("Minors");
        players[7].setCapital(rTemp["Norway"]);

        return players;
    }

    this.setOwners=function(rTemp,players){

        Object.keys(rTemp).forEach(function(reg){
            rTemp[reg].setOwner(players[7]);
        });


        rTemp["Portugal"].setOwner(players[1]);
        rTemp["Ireland"].setOwner(players[1]);
        rTemp["Scotland"].setOwner(players[1]);
        rTemp["England"].setOwner(players[1]);


        /**
         * French regions.
         */
        rTemp["Poitou"].setOwner(players[0]);
        rTemp["Brittany"].setOwner(players[0]);
        rTemp["Paris"].setOwner(players[0]);
        rTemp["Champagne"].setOwner(players[0]);
        rTemp["Burgundy"].setOwner(players[0]);
        rTemp["Languedoc"].setOwner(players[0]);
        rTemp["Auvergne"].setOwner(players[0]);



        rTemp["Turkey"].setOwner(players[2])
        rTemp["Albania"].setOwner(players[2])
        rTemp["Bulgaria"].setOwner(players[2])
        rTemp["Serbia"].setOwner(players[2])
        rTemp["Bosnia"].setOwner(players[2])
        rTemp["Croatia"].setOwner(players[2])
        rTemp["Romania"].setOwner(players[2])
        rTemp["Hungary"].setOwner(players[2])



        rTemp["Ukraine"].setOwner(players[3]);
        rTemp["Poland"].setOwner(players[3]);
        rTemp["Belarus"].setOwner(players[3]);
        rTemp["Baltic"].setOwner(players[3]);
        rTemp["Voronesh"].setOwner(players[3]);
        rTemp["Orel"].setOwner(players[3]);
        rTemp["Moscow"].setOwner(players[3]);
        rTemp["StPetersburg"].setOwner(players[3]);
        rTemp["Finland"].setOwner(players[3]);
        rTemp["Karelia"].setOwner(players[3]);

        rTemp["Madrid"].setOwner(players[4]);
        rTemp["Andalucia"].setOwner(players[4]);
        rTemp["Portugal"].setOwner(players[4]);
        rTemp["Galicia"].setOwner(players[4]);
        rTemp["Catalonia"].setOwner(players[4]);

        rTemp["Austria"].setOwner(players[5])
        rTemp["Hungary"].setOwner(players[5])
        rTemp["Venice"].setOwner(players[5])
        rTemp["Bohemia"].setOwner(players[5])
        rTemp["Bavaria"].setOwner(players[5])

        rTemp["Prussia"].setOwner(players[6])
        rTemp["Berlin"].setOwner(players[6])
        rTemp["Pomerania"].setOwner(players[6])
        rTemp["Silesia"].setOwner(players[6])



    }

    function linkRegions(r1,r2){
        r1.addBorder(r2);
        r2.addBorder(r1);
    }

    this.setBorders=function(rTemp){


        /**
         * Add borders for England.
         */
        linkRegions(rTemp["England"],rTemp["Scotland"]);
        linkRegions(rTemp["England"],rTemp["Ireland"]);
        linkRegions(rTemp["England"],rTemp["Holland"]);
        linkRegions(rTemp["England"],rTemp["Belgium"]);
        linkRegions(rTemp["England"],rTemp["Champagne"]);
        linkRegions(rTemp["England"],rTemp["Brittany"]);
        linkRegions(rTemp["England"],rTemp["Norway"]);

        linkRegions(rTemp["Portugal"],rTemp["Galicia"]);
        linkRegions(rTemp["Portugal"],rTemp["Madrid"]);
        linkRegions(rTemp["Portugal"],rTemp["Andalucia"]);

        linkRegions(rTemp["Belgium"],rTemp["Champagne"]);
        linkRegions(rTemp["Belgium"],rTemp["Alsace"]);
        linkRegions(rTemp["Belgium"],rTemp["Hesse"]);
        linkRegions(rTemp["Holland"],rTemp["Hanover"]);
        linkRegions(rTemp["Holland"],rTemp["Hesse"]);

        linkRegions(rTemp["Greece"],rTemp["Albania"]);
        linkRegions(rTemp["Greece"],rTemp["Bulgaria"]);
        linkRegions(rTemp["Greece"],rTemp["Turkey"]);
        linkRegions(rTemp["Greece"],rTemp["Sicily"]);

        /**
         * Add borders for France.
         */
        linkRegions(rTemp["Poitou"],rTemp["Catalonia"]);
        linkRegions(rTemp["Auvergne"],rTemp["Catalonia"]);
        linkRegions(rTemp["Champagne"],rTemp["Alsace"]);
        linkRegions(rTemp["Burgundy"],rTemp["Alsace"]);
        linkRegions(rTemp["Languedoc"],rTemp["Savoy"]);
        linkRegions(rTemp["Morocco"],rTemp["Andalucia"]);
        linkRegions(rTemp["Algeria"],rTemp["Andalucia"]);
        linkRegions(rTemp["Tunisia"],rTemp["Sicily"]);

        linkRegions(rTemp["Paris"],rTemp["Brittany"]);
        linkRegions(rTemp["Paris"],rTemp["Champagne"]);
        linkRegions(rTemp["Paris"],rTemp["Poitou"]);
        linkRegions(rTemp["Paris"],rTemp["Auvergne"]);
        linkRegions(rTemp["Paris"],rTemp["Burgundy"]);
        linkRegions(rTemp["Languedoc"],rTemp["Burgundy"]);
        linkRegions(rTemp["Languedoc"],rTemp["Auvergne"]);

        linkRegions(rTemp["Poitou"],rTemp["Auvergne"]);
        linkRegions(rTemp["Poitou"],rTemp["Paris"]);
        linkRegions(rTemp["Poitou"],rTemp["Brittany"]);

        linkRegions(rTemp["Burgundy"],rTemp["Champagne"]);

        linkRegions(rTemp["Champagne"],rTemp["Brittany"]);


        linkRegions(rTemp["Algeria"],rTemp["Tunisia"]);
        linkRegions(rTemp["Algeria"],rTemp["Morocco"]);

        /**
         * Add borders for Germany.
         */
        linkRegions(rTemp["Bavaria"],rTemp["Austria"]);
        linkRegions(rTemp["Bavaria"],rTemp["Bohemia"]);
        linkRegions(rTemp["Thuringen"],rTemp["Bohemia"]);
        linkRegions(rTemp["Silesia"],rTemp["Bohemia"]);
        linkRegions(rTemp["Silesia"],rTemp["Poland"]);
        linkRegions(rTemp["Prussia"],rTemp["Poland"]);
        linkRegions(rTemp["Prussia"],rTemp["Baltic"]);
        linkRegions(rTemp["SH"],rTemp["Denmark"]);

        linkRegions(rTemp["Berlin"],rTemp["Pomerania"]);
        linkRegions(rTemp["Berlin"],rTemp["Silesia"]);
        linkRegions(rTemp["Berlin"],rTemp["SH"]);
        linkRegions(rTemp["Berlin"],rTemp["Thuringen"]);

        linkRegions(rTemp["Thuringen"],rTemp["Hesse"]);
        linkRegions(rTemp["Thuringen"],rTemp["Hanover"]);

        linkRegions(rTemp["Hanover"],rTemp["Hesse"]);
        linkRegions(rTemp["Hesse"],rTemp["Bavaria"]);
        linkRegions(rTemp["Hesse"],rTemp["Alsace"]);
        linkRegions(rTemp["Hesse"],rTemp["Wuttenberg"]);
        linkRegions(rTemp["Wuttenberg"],rTemp["Bavaria"]);


        linkRegions(rTemp["Alsace"],rTemp["Wuttenberg"]);

        /**
         * Add borders for Russia.
         */
        linkRegions(rTemp["Finland"],rTemp["Sweden"]);
        linkRegions(rTemp["Poland"],rTemp["Hungary"]);
        linkRegions(rTemp["Ukraine"],rTemp["Hungary"]);
        linkRegions(rTemp["Ukraine"],rTemp["Romania"]);

        linkRegions(rTemp["Belarus"],rTemp["Poland"]);
        linkRegions(rTemp["Belarus"],rTemp["Baltic"]);
        linkRegions(rTemp["Belarus"],rTemp["Orel"]);
        linkRegions(rTemp["Belarus"],rTemp["Voronesh"]);

        linkRegions(rTemp["Ukraine"],rTemp["Romania"]);
        linkRegions(rTemp["Ukraine"],rTemp["Hungary"]);
        linkRegions(rTemp["Ukraine"],rTemp["Poland"]);
        linkRegions(rTemp["Ukraine"],rTemp["Voronesh"]);

        linkRegions(rTemp["Orel"],rTemp["Baltic"]);
        linkRegions(rTemp["Orel"],rTemp["Voronesh"]);
        linkRegions(rTemp["Orel"],rTemp["Moscow"]);

        linkRegions(rTemp["StPetersburg"],rTemp["Baltic"]);
        linkRegions(rTemp["StPetersburg"],rTemp["Moscow"]);
        linkRegions(rTemp["StPetersburg"],rTemp["Karelia"]);
        linkRegions(rTemp["StPetersburg"],rTemp["Finland"]);
        linkRegions(rTemp["Belarus"],rTemp["Ukraine"]);
        linkRegions(rTemp["Orel"],rTemp["StPetersburg"]);
        linkRegions(rTemp["Moscow"],rTemp["Voronesh"]);
        linkRegions(rTemp["Moscow"],rTemp["Karelia"]);
        linkRegions(rTemp["Karelia"],rTemp["Finland"]);

        /**
         * Add borders for Spain.
         */
        linkRegions(rTemp["Catalonia"],rTemp["Galicia"]);
        linkRegions(rTemp["Catalonia"],rTemp["Madrid"]);
        linkRegions(rTemp["Catalonia"],rTemp["Andalucia"]);
        linkRegions(rTemp["Portugal"],rTemp["Madrid"]);
        linkRegions(rTemp["Portugal"],rTemp["Galicia"]);
        linkRegions(rTemp["Madrid"],rTemp["Andalucia"]);
        linkRegions(rTemp["Madrid"],rTemp["Galicia"]);

        /**
         * Add borders for Italy.
         */
        linkRegions(rTemp["Savoy"],rTemp["Venice"]);
        linkRegions(rTemp["Savoy"],rTemp["Rome"]);
        linkRegions(rTemp["Rome"],rTemp["Naples"]);
        linkRegions(rTemp["Naples"],rTemp["Greece"]);
        linkRegions(rTemp["Venice"],rTemp["Austria"]);
        linkRegions(rTemp["Sicily"],rTemp["Naples"]);

        /**
         * Add borders for Balkans
         */
        linkRegions(rTemp["Serbia"],rTemp["Bosnia"]);
        linkRegions(rTemp["Serbia"],rTemp["Croatia"]);
        linkRegions(rTemp["Serbia"],rTemp["Albania"]);
        linkRegions(rTemp["Serbia"],rTemp["Bulgaria"]);
        linkRegions(rTemp["Serbia"],rTemp["Romania"]);
        linkRegions(rTemp["Serbia"],rTemp["Hungary"]);

        linkRegions(rTemp["Hungary"],rTemp["Croatia"]);
        linkRegions(rTemp["Hungary"],rTemp["Romania"]);
        linkRegions(rTemp["Hungary"],rTemp["Austria"]);
        linkRegions(rTemp["Hungary"],rTemp["Bohemia"]);

        linkRegions(rTemp["Croatia"],rTemp["Bosnia"]);
        linkRegions(rTemp["Croatia"],rTemp["Venice"]);
        linkRegions(rTemp["Croatia"],rTemp["Austria"]);
        linkRegions(rTemp["Austria"],rTemp["Bohemia"]);

        linkRegions(rTemp["Bulgaria"],rTemp["Romania"]);
        linkRegions(rTemp["Bulgaria"],rTemp["Turkey"]);




        /**
         * Add borders for Scandinavia.
         */
        linkRegions(rTemp["Denmark"],rTemp["Norway"]);
        linkRegions(rTemp["Denmark"],rTemp["Sweden"]);
        linkRegions(rTemp["Norway"],rTemp["Sweden"]);
        linkRegions(rTemp["Scotland"],rTemp["Norway"]);
        linkRegions(rTemp["Scotland"],rTemp["Ireland"]);


    }


    this.generateMap=function(){
        var rTemp=this.createRegions();
        var players=this.createPlayers(rTemp);
        this.setOwners(rTemp,players);
        this.setBorders(rTemp);
        var regions=Object.keys(rTemp).map(function(key){
            return rTemp[key];
        });
        players.forEach(function(player){
            regions.forEach(function(region){
                player.createArmy(region);
            });
        });
        var data={};
        data["regions"]=regions;
        data["players"]=players;
        return data;
    }
}
