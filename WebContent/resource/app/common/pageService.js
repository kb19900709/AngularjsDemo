angular.module('kbApp')
    .factory('PageService', [function() {

        var object = {};

        return {
            setObject: function(key,param) {
            	object[key] = param;
            },

            getObject: function(key){
            	var param = angular.copy(object[key]);
            	delete object[key];
            	return param;
            }
        };
    }])
