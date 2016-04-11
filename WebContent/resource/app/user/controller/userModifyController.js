angular.module('kbApp')
    .controller('UserModifyCtrl', ['$location', 'UserService', 'PageService','DialogService', function($location, userSrv, pageSrv,dialogSrv) {
        var self = this;
        var userTemplate = {
            seqNo: '',
            userName: '',
            userEmail: '',
            userPhone: '',
            userGender: '',
            userSignUpDate: null,
            userCountry: ''
        };

        self.user = {};
        self.showMessage = false;

        initPageOptions();

        self.editUser = function() {
            self.user.userSports = processUserSports();
            if (self.user.seqNo) {
                userSrv.update(self.user.seqNo, self.user, function(response) {
                    dialogSrv.informProvider('Modify user success');
                    self.back();
                });
            } else {
                userSrv.save(self.user, function(response) {
                    dialogSrv.informProvider('Create user success');
                    self.back();
                });
            }
        };

        self.clearUser = function() {
            self.user = angular.copy(userTemplate);
            angular.forEach(self.sports, function(sport) {
                sport.selected = 0;
            });
        };

        self.back = function() {
            $location.path('/user/userMaintain.html');
        };

        function processUserSports() {
            var userSports = '';
            angular.forEach(self.sports, function(sport) {
                if (sport.selected == 1) {
                    if (userSports) {
                        userSports += ',' + sport.value
                    } else {
                        userSports += sport.value;
                    }
                }
            });
            return (userSports != '') ? userSports : null;
        };

        function initPageOptions() {

            self.country = [
                { value: 'TW', label: '台灣' },
                { value: 'US', label: '美國' },
                { value: 'VN', label: '越南' },
                { value: 'TH', label: '泰國' },
                { value: 'IS', label: '冰島' }
            ];;

            self.sports = [
                { value: '1', label: 'Basketball', selected: 0 },
                { value: '2', label: 'Baseball', selected: 0 },
                { value: '3', label: 'Cricket', selected: 0 },
                { value: '4', label: 'Soccer', selected: 0 }
            ];

            self.gender = [
                { value: '0', label: 'Girl' },
                { value: '1', label: 'Boy' }
            ];

            self.user = pageSrv.getObject('user');

            if (!self.user) {
                self.user = angular.copy(userTemplate);
            } else {
                self.user.userSignUpDate = new Date(self.user.userSignUpDate);
                if (self.user.userSports) {
                    angular.forEach(self.user.userSports.split(','), function(value) {
                        angular.forEach(self.sports, function(sport) {
                            if (angular.equals(value, sport.value)) {
                                sport.selected = 1;
                            }
                        });
                    });
                }
            }
        }
    }]);