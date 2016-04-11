angular.module('kbApp')
	.controller('HomeCtrl',['HomeService','$location','$window',function(homeSrv,$location,$window){
		var self = this;
		self.menuList = {};
		
		var menuQueryResult = homeSrv.query();
		if(menuQueryResult){
			self.menuList = menuQueryResult.resultList;
		}

		self.menuChange = function(url){
			$location.path(url);
		};

		self.learnMore = function(){
			$window.open('https://angularjs.org/');
		};

		self.goHome = function(){
			$location.path('/home/aboutThisWeb.html');
		};

		$location.path('/home/aboutThisWeb.html');
	}]);
