angular.module('kbApp')
	.factory('HttpRequestInterceptor', ['$q','$log', function($q,$log){
		return {
			request : function(config){
				var logStr = config.method+' '+config.url;
				if(config.data){
					logStr += ' >>> data:'+angular.toJson(config.data);
				}
				$log.log(logStr);
				return config;
			},
			
			responseError : function(responseRejection){
				$log.log('HttpRequestInterceptor catch response error : '+angular.toJson(responseRejection));
				if(responseRejection.status == 403){
					//redirect to login page
				}
				return $q.reject(responseRejection);
			}
		};
	}])