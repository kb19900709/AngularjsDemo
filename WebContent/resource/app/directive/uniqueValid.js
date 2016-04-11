angular.module('kbApp')
    .directive('uniqueValid', ['$location', '$http', 'contextPath', 'DialogService', function($location, $http, contextPath, dialogSrv) {

        var primaryKey = 'seqNo';
        var urlArray = $location.absUrl().split('/');
        var functionName = urlArray[urlArray.indexOf('#') + 1];
        var validateUrl = contextPath + '/' + functionName + '/validate'

        function validateTemplate(object, target) {
            var validateObject = angular.copy(object);
            for (key in validateObject) {
                if (!(angular.equals(key, primaryKey) || angular.equals(key, target))) {
                    delete validateObject[key];
                }
            }

            return $http.post(validateUrl, validateObject);
        }

        return {
            scope: true,
            require: 'ngModel',
            restrict: 'A',
            link: function($scope, $element, $attr, modelCtrl) {

                var bindingKey = modelCtrl.$name;
                var bindingObjectStr = $attr.ngModel.replace('.' + bindingKey, '');

                $element.bind('blur', function(event) {

                    var bindingObject = $scope.$eval(bindingObjectStr);
                    var record = angular.copy(bindingObject);

                    if ($element.val()) {
                    	
                        validateTemplate(record, bindingKey).then(function(response) {
                            //do nothing
                        }, function(error) {
                            bindingObject[bindingKey] = undefined;

                            if (error.status == 400) {
                                dialogSrv.warnProvider('Duplicate value，you can not use : '+record[bindingKey], event);
                            } else if (error.status == 404) {
                                dialogSrv.warnProvider('Please confirm the value is valid', event);
                            }

                        });
                    }
                });
            }
        };
    }]);;
