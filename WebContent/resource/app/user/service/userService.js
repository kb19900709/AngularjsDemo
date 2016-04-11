angular.module('kbApp')
    .factory('UserService', ['$resource','contextPath', function($resource,contextPath) {
    	var urlTemplate = contextPath+'/user/:id';
        return $resource(urlTemplate, { id: '@seqNo' }, {
            update: {
                method: 'PUT'
            },

        	query:{
        		method: 'GET',
        		isArray: false
        	},
            
            queryByParams: {
                method: 'POST',
                url: contextPath+'/user/query',
                isArray: false
            }
        });
    }]);