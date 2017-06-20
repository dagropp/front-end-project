(function () {
    var app = angular.module("app");
    app.controller("mainCtrl",mainCtrl);

    function mainCtrl($location,mainDB,setHistory) {
        var main = this;
        //retrieve ajax call
        main.datalist = mainDB.then(
            result => {main.datalist = result}, 
            error => {console.error("error obtaining data")}
        );
        //re-occuring operations
        function removeHeader() {document.querySelector("header").classList.remove("search-minimize")}
        function minimizeMenu() {document.querySelector("header").classList.add("minimized-menu")}
        function maximizeMenu() {document.querySelector("header").classList.remove("minimized-menu")}
        function searchFocus() {document.querySelector("#search-bar input").focus()}
        main.minimizeMenu = minimizeMenu;
        main.searchFocus = searchFocus;
        //route function: go to homepage
        main.goHome = function() {
            $location.path("/home");
            main.outcome = "";
            main.searchFocus();
            removeHeader();
            maximizeMenu();
        }
		//route function: go to search results
		main.goSearch = function() {
            if (main.outcome) {
				$location.path("/search-results/"+main.outcome);
                setHistory("last-search",main.outcome);
                removeHeader();
			}
        }
		//route function: go to wood database
		main.goDatabase = function() {
            $location.path("/database");
            main.outcome = "";
            removeHeader();
            minimizeMenu();
		}
		//route function: go to advanced search page
		main.goAdvanced = function() {
            $location.path("/advanced-search")
            main.outcome = "";
            removeHeader();
            minimizeMenu();
		}
        //route function: go to random wood description
		main.goRandom = function() {
			var random = Math.floor((Math.random()*main.datalist.length)+1);
            $location.path("/wood-description/"+random);
            setHistory("last-page",random);
            main.outcome = "";
            removeHeader();
            minimizeMenu();
        }
        //expending footer and header
        main.classToggle = function(selector,className) {
            document.querySelector(selector).classList.toggle(className);
        }
        //copy e-mail address
        main.clipBoard = function() {
            document.getElementById("copyMail").select();
            document.execCommand("copy");
        };
    }
})()