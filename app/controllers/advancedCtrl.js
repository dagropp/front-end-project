(function () {
    var app = angular.module("app");
    app.controller("advancedCtrl", advancedCtrl);
    
    function advancedCtrl($scope,$location,mainDB) {
        //create custom range-sliders
        function makeSlider(title,field,minimum,maximum,addition,string=false,vertical=false) {
            return {
                title: title,
				minValue: minimum,
                maxValue: maximum,
				addition: addition,
				stringValue: string,
                options: {
                    floor: minimum,
                    ceil: maximum,
                    step: 1,
                    showTicks: false,
                    vertical: vertical,
                }
            }
        }
        //var declerations for specifying in custom range-sliders
        var density,hardness,workability,glue,finish,price,endangerLevel;
		//string values to replace numerical range values
        var workabilityValues = ["קשה","בינוני","קל"];
		var qualityValues = ["גרועה","בינונית","טובה"];
        var endangerValues = ["בסכנת הכחדה","פגיע","קרוב לאִיוּם","ללא חשש"];
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {
                $scope.datalist = result
                //get minimum and maximum values for selected datalist keys
                function getMin(nest) {return Math.min.apply(Math,$scope.datalist.map(nest))}
                function getMax(nest) {return Math.max.apply(Math,$scope.datalist.map(nest))}
                var densityVal = {
                    min: getMin(result => {return result.density}),
                    max: getMax(result => {return result.density})
                }
                var hardnessVal = {
                    min: getMin(result => {return result.hardness}),
                    max: getMax(result => {return result.hardness})
                }
                var priceVal = {
                    min: getMin(result => {return result.price}),
                    max: getMax(result => {return result.price})
                }
                var workabilityVal = {
                    min: getMin(result => {return result.workability}),
                    max: getMax(result => {return result.workability})
                }
                var finishVal = {
                    min: getMin(result => {return result.finish}),
                    max: getMax(result => {return result.finish})
                }
                var glueVal = {
                    min: getMin(result => {return result.glue}),
                    max: getMax(result => {return result.glue})
                }
                var endangerLevelVal = {
                    min: getMin(result => {return result.endangerLevel}),
                    max: getMax(result => {return result.endangerLevel})
                }
                //create an array of specified range-sliders
                $scope.sliders = [
                    $scope.density = makeSlider("דרגת צפיפות",density,densityVal.min,densityVal.max," kg/m³"),
                    $scope.hardness = makeSlider("דרגת קושי",hardness,hardnessVal.min,hardnessVal.max," N"),
                    $scope.price = makeSlider("מחיר לקוב",price,priceVal.min,priceVal.max,' ש"ח'),
                    $scope.workability = makeSlider("קושי בעבודה",workability,workabilityVal.min,workabilityVal.max,"",workabilityValues,true),
                    $scope.finish = makeSlider("איכות הגימור",finish,finishVal.min,finishVal.max,"",qualityValues,true),
                    $scope.glue = makeSlider("איכות הדבקה",glue,glueVal.min,glueVal.max,"",qualityValues,true),
                    $scope.endangerLevel = makeSlider("מצב שימור",endangerLevel,endangerLevelVal.min,endangerLevelVal.max,"",endangerValues,true)
                ]
            }, 
            error => {console.error("error obtaining data")}
        );
        
        //compare matches of user-specified parameters and the main database
        $scope.checkAdvancedSearch = function() {
        $scope.anyMatches = [];    
        //loop that covers the whole database
        for (i=0;i<$scope.datalist.length;i++) {
            $scope.datalist[i].advancedScore = 0;
                //generic function to check a later-specified specific field
                function checkQuery(sliderField,datalistField) {
                    if (sliderField.minValue <= datalistField && 
                        sliderField.maxValue >= datalistField)
                        $scope.datalist[i].advancedScore += 1;
                }
                //query checks
                checkQuery($scope.density,$scope.datalist[i].density);
                checkQuery($scope.hardness,$scope.datalist[i].hardness);
                checkQuery($scope.workability,$scope.datalist[i].workability);
                checkQuery($scope.finish,$scope.datalist[i].finish);
                checkQuery($scope.glue,$scope.datalist[i].glue);
                checkQuery($scope.endangerLevel,$scope.datalist[i].endangerLevel);
                checkQuery($scope.price,$scope.datalist[i].price);
                if ($scope.steamBending) {
                    if ($scope.steamBending == $scope.datalist[i].steamBending) $scope.datalist[i].advancedScore += 1;
                }
                else $scope.datalist[i].advancedScore += 1;
                //handling the final outcome, so irrelevant items are removed from results
                if ($scope.datalist[i].advancedScore == 8) $scope.datalist[i].advancedScore = true;
                else delete $scope.datalist[i].advancedScore;        
                if(!$scope.datalist[i].advancedScore) {
                    $scope.anyMatches.push(1);
                    if ($scope.anyMatches.length == $scope.datalist.length) $scope.noResults = "noResults";
                    else $scope.noResults = "showResults";
                }
            }
            //route function: go to advanced search results
            $location.path("/advanced-results/"+$scope.noResults);
        }
    }
})();