(function () {
    var app = angular.module("app");
    app.controller("searchResultsCtrl", searchResultsCtrl);
    
    function searchResultsCtrl($scope,$location,$routeParams,$window,mainDB,setHistory) {
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {$scope.datalist = result}, 
            error => {console.error("error obtaining data")}
        );
        //handling the requested search
        $scope.outcome = $routeParams.search
        //scroll event
        $window.onscroll = function() {
            if (document.body.scrollTop > 70) document.querySelector("header").classList.add("minimized-menu-scroll");
            else document.querySelector("header").classList.remove("minimized-menu-scroll");
        }
        //route function: go to selected wood description & send it to page history
        $scope.goWoodDescription = function(selection) {
            $location.path("/wood-description/"+selection);
            setHistory("last-page",selection);
            document.querySelector("header").classList.add("minimized-menu");
        }
    }
    
})()