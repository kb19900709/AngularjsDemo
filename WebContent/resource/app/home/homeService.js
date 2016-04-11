angular.module('kbApp')
    .factory('HomeService', [function() {
        var menuDataList = {
            resultList: [{
                menuName: 'Angular Introduction',
                menuIconPath: 'resource/image/aLetter.svg',
                functionPath: 'angular/angularIntroduction.html',
                order: 1
            },{
                menuName: 'Angular Demo',
                menuIconPath: 'resource/image/userIcon.svg',
                functionPath: 'user/userMaintain.html',
                order: 2
            },{
                menuName: 'About this web',
                menuIconPath: 'resource/image/web.svg',
                functionPath: 'home/aboutThisWeb.html',
                order: 3
            }]
        };

        return {
        	query : function(){
        		return menuDataList;
        	}
        };
    }]);
