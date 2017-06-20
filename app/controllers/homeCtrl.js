(function () {
    var app = angular.module("app");
    app.controller("homeCtrl", homeCtrl);
    
    function homeCtrl($scope,$location,$http,$window,mainDB,setHistory) {
        //retrieve ajax call
        $scope.datalist = mainDB.then(
            result => {
                $scope.datalist = result
                //check if there is history, and if so put it in array
                var pageHistoryId = JSON.parse(localStorage.getItem("last-page"));
                $scope.pageHistory = [];
                try {
                    for (i=0;i<pageHistoryId.length;i++) {
                        for (a=0;a<$scope.datalist.length;a++) {
                            if (pageHistoryId[i] == $scope.datalist[a].id) {
                                $scope.pageHistory.push([$scope.datalist[a].commonName,pageHistoryId[i]]);
                                break;
                            }
                        }
                    }
                }
                catch(error) {$scope.pageHistory=false}
            }, 
            error => {console.error("error obtaining data")}
        );
        //scroll event
        if ($window.matchMedia("(min-width: 1100px)").matches) {
            $window.onscroll = function() {
                if (document.body.scrollTop > 70) document.querySelector("header").classList.add("minimized-menu-scroll");
                else document.querySelector("header").classList.remove("minimized-menu-scroll");
            }
        }
        //get the history
        $scope.searchHistory = JSON.parse(localStorage.getItem("last-search"));
        //ajax call - fetch "warehouses" database
        $http.get("../app/data/warehouses.json").
        then(function(response,error){
            if (error) console.error("error obtaining data");
            else $scope.woodWarehouses = response.data;
        });
        
    }
})()