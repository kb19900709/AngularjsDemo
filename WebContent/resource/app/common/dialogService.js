angular.module('kbApp')
    .factory('DialogService', ['$mdDialog', function($mdDialog) {
        return {
            warnProvider: function(textContent, event) {
                var warn = $mdDialog.alert()
                    .title('Warn')
                    .textContent(textContent)
                    .ok('OK');

                if (event) {
                    warn.targetEvent(event);
                }

                $mdDialog.show(warn);
            },

            informProvider: function(textContent, event) {
                var inform = $mdDialog.alert()
                    .title('Inform')
                    .textContent(textContent)
                    .ok('OK');

                if (event) {
                    inform.targetEvent(event);
                }

                $mdDialog.show(inform);
            },

            confirmProvider: function(textContent, event, successFun, errorFun) {
                var confirm = $mdDialog.confirm()
                    .title('Confirm')
                    .textContent(textContent)
                    .ok('OK')
                    .cancel('STOP');

                if (event) {
                    confirm.targetEvent(event);
                }

                $mdDialog.show(confirm).then(successFun, errorFun);
            },

            customProvider: function(showObject){
                return $mdDialog.show(showObject);
            }
        };
    }]);