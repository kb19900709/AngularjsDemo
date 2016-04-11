angular.module('kbApp')
    .controller('UserQueryCtrl', ['$location', 'DialogService', 'UserService', 'PageService', function($location, dialogSrv, userSrv, pageSrv) {
        var self = this;
        var queryParamsTemplate = {
            userName: '',
            userEmail: '',
            userSignUpDate: null
        };

        self.queryParams = angular.copy(queryParamsTemplate);

        self.users = [];

        userSrv.query(function(response) {
            self.users = response.resultList;
        });

        self.clearParams = function() {
            self.queryParams = angular.copy(queryParamsTemplate);
        };

        self.addUser = function() {
            $location.path('/user/userModify.html');
        }

        self.searchUser = function() {
            userSrv.queryByParams(self.queryParams, function(response) {
                self.users = response.resultList;
            });
        };

        self.editUser = function(user) {
            pageSrv.setObject('user', user);
            $location.path('/user/userModify.html');
        };

        self.deleteUser = function(user, event) {
            dialogSrv.confirmProvider('This user will delete in database', event, function() {
                userSrv.delete({ id: user.seqNo }, function(response) {
                    dialogSrv.informProvider('Delete user success');
                    self.searchUser();
                });
            });
        };

        self.getUserInfo = function(user,event){
            
            function DialogController($scope, $mdDialog){
                $scope.user = user;
                $scope.cancel = function(){
                    $mdDialog.cancel();
                }
            };

            dialogSrv.customProvider({
                controller: DialogController,
                templateUrl: 'resource/app/user/userInfo.html',
                targetEvent: event,
                clickOutsideToClose:true
            });
        };
    }]);