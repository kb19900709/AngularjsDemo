angular.module('kbApp')
    .filter('sport', [function() {
        var sportArray = [
            { value: '1', label: 'Basketball'},
            { value: '2', label: 'Baseball'},
            { value: '3', label: 'Cricket'},
            { value: '4', label: 'Soccer'}
        ];

        return function(sportsValue){
        	var result = '';
        	if(sportsValue){
        		var userSportArray = sportsValue.split(',');
	        	for(var i=0;i<userSportArray.length;i++){
	        		for(var j=0;j<sportArray.length;j++){
	        			if(userSportArray[i] == sportArray[j].value){
	        				if(result){
	        					result += ','+sportArray[j].label;
	        				}else{
	        					result = sportArray[j].label;
	        				}
	        				break;
	        			}
	        		}
	        	}
        	}
        	return result;
        }
    }]);
