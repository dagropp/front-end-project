(function () {
    var app = angular.module("app");
    //custom ajax-call service
    app.factory("mainDB", function($http) {
        var data = $http.get("../app/data/main-database.json").
        then(function(response,error){
            if (error) console.error("error obtaining data");
            else return response.data;
        })
        return data;
    });
    //custom history service
    app.factory("setHistory", function() {
        var history = function(field,parameter) {
            var array;
            var getData = localStorage.getItem(field);
            try {
                array = JSON.parse(getData);
                if (array.indexOf(parameter) < 0) array.unshift(parameter);
                if (array.length > 7) array.pop();
            }
            catch(error) {array = [parameter]}
            localStorage.setItem(field,JSON.stringify(array));
            return array;   
        }
        return history;
    });
})()