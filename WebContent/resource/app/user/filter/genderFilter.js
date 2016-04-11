angular.module('kbApp')
    .filter('gender', [function() {
        return function(gender) {
            var result;
            switch (gender) {
                case "0":
                    result = 'Girl';
                    break;
                case "1":
                    result = 'Boy';
                    break;
                default:
                    result = 'Unknown';
            }
            return result;
        };
    }]);