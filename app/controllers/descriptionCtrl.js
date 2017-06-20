(function () {
    var app = angular.module("app");
    app.controller("descriptionCtrl", descriptionCtrl);
    
    function descriptionCtrl($scope,$routeParams,mainDB) {
        //handling the requested entry
        var selection = $routeParams.selection;
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {
                $scope.datalist = result;
                //finding the requested entry
                for (i=0; i<$scope.datalist.length;i++) {
                    if ($scope.datalist[i].id == selection) $scope.currentWood = $scope.datalist[i];
                }}, 
            error => {console.error("error obtaining data")}
        );
		//string values to replace numerical range values
        $scope.workabilityValues = ["קשה","בינוני","קל"];
		$scope.qualityValues = ["גרועה","בינונית","טובה"];
        $scope.endangerValues = ["בסכנת הכחדה","פגיע","קרוב לאִיוּם","ללא חשש"];

    }
})()