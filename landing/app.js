//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);

//Define Routing for app
//Uri /AddNewOrder -> template gameHelp.html and Controller AddOrderController
//Uri /ShowOrders -> template playGame.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/PlayGame', {
                templateUrl: 'landing/templates/playGame.html',
                controller: 'PlayGameController'
            }).
            when('/Help', {
                templateUrl: 'landing/templates/gameHelp.html',
                controller: 'HelpController'
            }).
            otherwise({
                redirectTo: '/PlayGameController'
            });
    }]);


sampleApp.controller('PlayGameController', function($scope) {
    startClient(new LocalConnectionManager(),"Host");

});


sampleApp.controller('HelpController', function($scope) {


});
