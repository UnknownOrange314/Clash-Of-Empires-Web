function Europe(){
    this.createRegions=function(){
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



        Object.keys(rTemp).forEach(function(rName){
            rTemp[rName].setName(rName);
        });
        return rTemp;
    }

    this.createPlayers=function(rTemp){
        var players=[];
        for(var i=1;i<6;i++){
            var p=null;
            if(i===2){//Create human player.
                p=new Player(i,new NoAI("1.1.1.1"));
            }
            else{
                p=new Player(i,new Computer());
            }
            players.push(p);
        }
        for(i=0;i<rTemp.length;i++){
            rTemp[i].setOwner(players[4]);
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
        return players;
    }

    this.setOwners=function(rTemp,players){

        Object.keys(rTemp).forEach(function(reg){
            rTemp[reg].setOwner(players[4]);
        });

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
