(function () {
    var app = angular.module("app");
    app.controller("advancedResultsCtrl", advancedResultsCtrl);
    
    function advancedResultsCtrl($scope,$routeParams,$location,mainDB,setHistory) {
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {$scope.datalist = result}, 
            error => {console.error("error obtaining data")}
        );
        //finding if there are any results
        $scope.anyResults = $routeParams.results;
        //route function: go to selected wood description & send it to page history
        $scope.goWoodDescription = function(selection) {
            $location.path("/wood-description/"+selection);
            setHistory("last-page",selection);
        }
    }
})()