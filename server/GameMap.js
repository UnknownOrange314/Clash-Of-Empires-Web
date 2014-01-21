function GameMap(){


    var socket = io.connect('http://192.17.224.200:880');//Connect to server.

    var rTemp={};

    rTemp["Portugal"]=(new Region(47,442));
    rTemp["Madrid"]=new Region(121,487);
    rTemp["Andalucia"]=new Region(93,529);
    rTemp["Galicia"]=new Region(111,424);
    rTemp["Catalonia"]=new Region(187,458);

    rTemp["Poitou"]=new Region(185,390);
    rTemp["Brittany"]=new Region(186,328);
    rTemp["Paris"]=new Region(226,346);
    rTemp["Champagne"]=new Region(248,302);
    rTemp["Burgundy"]=new Region(268,361);
    rTemp["Languedoc"]=new Region(267,402);
    rTemp["Auvergne"]=new Region(221,414);

    rTemp["Savoy"]=new Region(330,417);
    rTemp["Venice"]=new Region(368,389);
    rTemp["Rome"]=new Region(385,468);
    rTemp["Naples"]=new Region(436,500);
    rTemp["Sicily"]=new Region(402,570);

    rTemp["Ireland"]=new Region(137,199);
    rTemp["England"]=new Region(218,239);
    rTemp["Scotland"]=new Region(194,144);
    rTemp["Belgium"]=new Region(284,286);
    rTemp["Holland"]=new Region(288,244);

    rTemp["Austria"]=new Region(414,367);
    rTemp["Hungary"]=new Region(491,360);
    rTemp["Bohemia"]=new Region(418,304);

    rTemp["Greece"]=new Region(527,528);
    rTemp["Turkey"]=new Region(690,519);
    rTemp["Albania"]=new Region(504,481);
    rTemp["Serbia"]=new Region(510,443);
    rTemp["Bosnia"]=new Region(457,430);
    rTemp["Croatia"]=new Region(423,394);
    rTemp["Romania"]=new Region(584,388);
    rTemp["Bulgaria"]=new Region(568,455);


    rTemp["Ukraine"]=new Region(611,290);
    rTemp["Poland"]=new Region(516,277);
    rTemp["Belarus"]=new Region(559,228);
    rTemp["Baltic"]=new Region(530,182);
    rTemp["Voronesh"]=new Region(712,226);
    rTemp["Orel"]=new Region(643,142);
    rTemp["Moscow"]=new Region(727,110);
    rTemp["StPetersburg"]=new Region(603,78);
    rTemp["Finland"]=new Region(511,44);
    rTemp["Karelia"]=new Region(616,25);
    rTemp["Norway"]=new Region(348,70);
    rTemp["Sweden"]=new Region(407,68);
    rTemp["Denmark"]=new Region(341,183);

    rTemp["Thuringen"]=new Region(368,270);
    rTemp["Prussia"]=new Region(474,227);
    rTemp["Silesia"]=new Region(428,282);
    rTemp["Bavaria"]=new Region(368,332);
    rTemp["Wuttenberg"]=new Region(326,330);
    rTemp["Hesse"]=new Region(320,287);
    rTemp["Hanover"]=new Region(348,250);
    rTemp["Alsace"]=new Region(296,333);
    rTemp["SH"]=new Region(370,229);
    rTemp["Berlin"]=new Region(395,260);
    rTemp["Pomerania"]=new Region(415,230);

    rTemp["Morocco"]=new Region(63,600);
    rTemp["Algeria"]=new Region(189,600);
    rTemp["Tunisia"]=new Region(308,625);






    var regions=Object.keys(rTemp).map(function(key){
        return rTemp[key];
    });



    players=[];
    for(var i=1;i<6;i++){
        var p=null;
        if(i===2){//Create human player.
            p=new Player(i,NoAI);
        }
        else{
            p=new Player(i,Computer);
        }
        players.push(p);
        for(var j=0;j<regions.length;j++){
            var reg=regions[j];
            p.createArmy(reg);
        }
    }


    for(var i=0;i<regions.length;i++){
        regions[i].setOwner(players[4]);
    }

    players[0].setName("France");
    players[0].setCapital(rTemp["Paris"]);

    players[1].setName("Great Britain");
    players[1].setCapital(rTemp["England"]);

    players[2].setName("Germany");
    players[2].setCapital(rTemp["Berlin"]);

    players[3].setName("Russia");
    players[3].setCapital(rTemp["Moscow"]);

    players[4].setName("Minors");
    players[4].setCapital(rTemp["Norway"]);

    rTemp["Portugal"].setOwner(players[1]);
    rTemp["Ireland"].setOwner(players[1]);
    rTemp["Scotland"].setOwner(players[1]);
    rTemp["England"].setOwner(players[1]);
    rTemp["Belgium"].setOwner(players[1]);
    rTemp["Holland"].setOwner(players[1]);
    rTemp["Greece"].setOwner(players[1]);


    /**
     * French regions.
     */
    rTemp["Morocco"].setOwner(players[0]);
    rTemp["Algeria"].setOwner(players[0]);
    rTemp["Poitou"].setOwner(players[0]);
    rTemp["Brittany"].setOwner(players[0]);
    rTemp["Paris"].setOwner(players[0]);
    rTemp["Champagne"].setOwner(players[0]);
    rTemp["Burgundy"].setOwner(players[0]);
    rTemp["Languedoc"].setOwner(players[0]);
    rTemp["Auvergne"].setOwner(players[0]);
    rTemp["Tunisia"].setOwner(players[0]);



    rTemp["Thuringen"].setOwner(players[2]);
    rTemp["Prussia"].setOwner(players[2]);
    rTemp["Silesia"].setOwner(players[2]);
    rTemp["Bavaria"].setOwner(players[2]);
    rTemp["Wuttenberg"].setOwner(players[2]);
    rTemp["Hesse"].setOwner(players[2]);
    rTemp["Hanover"].setOwner(players[2]);
    rTemp["Alsace"].setOwner(players[2]);
    rTemp["SH"].setOwner(players[2]);
    rTemp["Berlin"].setOwner(players[2]);
    rTemp["Pomerania"].setOwner(players[2]);


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







    for(var i=0;i<regions.length;i++){
        for(var j=0;j<regions.length;j++){
            if(i!==j){
                if(regions[i].distance(regions[j])<150){
                    regions[i].addBorder(regions[j]);
                    regions[j].addBorder(regions[i]);
                }
            }
        }
    }

    //Below are methods for processing input from clients

    var clickA=null;
    var clickB=null;

    this.clearClicks=function(){
        clickA=null;
        clickB=null;
    }

    /**
     * @param pt
     */
    this.processClick=function(pt){
        if(clickA==null){
            clickA=pt;
        }
        else{
            clickB=pt;
            this.processTwoClicks();
            this.clearClicks();
        }
    }

    /**
     * This function is called when two clicks are made.
     */
    this.processTwoClicks=function(){
        var r1=null;
        var r2=null;
        regions.forEach(function(region){
            if(region.getLocation().getDistance(clickA)<40){
                r1=region;
            }
            if(region.getLocation().getDistance(clickA)<40){
                r2=region;
            }
        });
        setMovementCommand(r1,r2);
    }

    /**
     * This function sets movement between two regions.
     */
    this.setMovementCommand=function(r1,r2){
        //If r1 and r2 are owned by the same player, troops will move.
        //if r1 and r2 are owned by different players, the troops will attack.
    }



    this.updateState=function(){

        //Perform AI actions.
        players.forEach(function(player){
            player.AI();
            player.updateScore();
        });

        //Build troops for each region
        regions.forEach(function(region){
            region.buildTroop();
        });


        var renderState=regions.map(function(region){
            return region.getRenderState();
        });

        var JSONState=renderState.map(function(state){
            var arr={};
            arr["owner"]=state.getOwner();
            arr["xPos"]=state.getX();
            arr["yPos"]=state.getY();
            arr["size"]=state.getSize();
            arr["army"]=state.getArmy();
            return arr;
        });
        socket.emit('hostRegionState', { data: JSONState});


        return JSONState;
    }

    this.getRegionCount=function(){
        return regions.length;
    }

    this.getPlayerStates=function(){
        return players.map(function(p){
            return p.getScore();
        });
    }
}
