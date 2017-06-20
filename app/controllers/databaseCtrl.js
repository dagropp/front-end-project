(function () {
    var app = angular.module("app");
    app.controller("databaseCtrl", databaseCtrl);
    
    function databaseCtrl($scope,$location,mainDB,setHistory) {
		//string values to replace numerical range values
        $scope.endangerValues = ["בסכנת הכחדה","פגיע","קרוב לאִיוּם","ללא חשש"];
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {$scope.datalist = result}, 
            error => {console.error("error obtaining data")}
        );
        //sort data-base (alphabetical or numerical)
        var direction = true;
        function sortDatabase(property) {
            direction=!direction;
            var sortOrder = 1;
            if(!direction) {
                sortOrder = -1;
            }
            return function(a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
        $scope.sortByField = function(field) {
            $scope.datalist = $scope.datalist.sort(sortDatabase(field));
        }
        //route function: go to selected wood description & send it to page history
        $scope.goWoodDescription = function(selection) {
            $location.path("/wood-description/"+selection);
            setHistory("last-page",selection);
        }
        
    }
})()