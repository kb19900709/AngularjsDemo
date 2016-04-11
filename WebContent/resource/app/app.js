angular.module('kbApp', ['ngResource', 'ngRoute', 'ngMaterial'])
	.constant('contextPath','/AngularjsDemo')
    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        var dev = false;

        $routeProvider.when('/:functionName/:htmlName', {
            templateUrl: function(attributes) {
                var url = 'resource/app/'+attributes.functionName + '/' + attributes.htmlName;
                return url;
            }
        });

        if(dev){
            $httpProvider.interceptors.push('HttpRequestInterceptor');
        }
        
    }]);
