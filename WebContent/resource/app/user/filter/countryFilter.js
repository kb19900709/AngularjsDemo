angular.module('kbApp')
    .filter('country', [function() {
        var countryArray = [
            { value: 'TW', label: '台灣' },
            { value: 'US', label: '美國' },
            { value: 'VN', label: '越南' },
            { value: 'TH', label: '泰國' },
            { value: 'IS', label: '冰島' }
        ];;

        return function(countryValue) {
        	var result;
        	angular.forEach(countryArray,function(country){
        		if(country.value == countryValue){
        			result = country.label;
        		}
        	});
        	return result;
        };
    }]);