(function(){
	var app = angular.module("app");
	app.config(function($routeProvider){
		$routeProvider.when("/home",{
			templateUrl:"/app/pages/home.html",
			controller:"homeCtrl"
		}).when("/database",{
			templateUrl:"/app/pages/database.html",
            controller:"databaseCtrl"
		}).when("/search-results/:search",{
			templateUrl:"/app/pages/search-results.html",
            controller:"searchResultsCtrl"
		}).when("/wood-description/:selection",{
            templateUrl:"app/pages/wood-description.html",
            controller:"descriptionCtrl"
        }).when("/advanced-search",{
            templateUrl:"app/pages/advanced-search.html",
            controller: "advancedCtrl"
        }).when("/advanced-results/:results",{
            templateUrl:"app/pages/advanced-results.html",
            controller: "advancedResultsCtrl"
        }).otherwise({
			redirectTo:"/home"
		})
	})
})()