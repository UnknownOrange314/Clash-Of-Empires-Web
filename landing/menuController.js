/**
 * This class is responsible for processing from the game menu.
 */

// define angular module/app
var formApp = angular.module('formApp', []);

// create angular controller and pass in $scope and $http
function helpController($scope, $http) {

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};

    $scope.startGame=function(){
       $("body").find('.container').hide()
       $.ajax({
           url:"game/gameHTML.txt",
           dataType:"text",
           success:function(data){
               $("body").find("#game").html(data);
               startClient(new connectionManager(),"Host");

           }
       })
    }

    $scope.showHelp=function(){
        $scope.message="War has broken out in Europe. Command your troops and lead your nation to glory"
    }



}