angular.module('kbApp')
    .controller('aiController', [function() {
        var self = this;

        self.tabs = [{
            title: 'Preface',
            htmlRef: 'resource/app/angular/angularPreface.html'
        },{
            title: 'Angularjs',
            htmlRef: 'resource/app/angular/angularSummary.html'
        },{
            title: 'Module',
            htmlRef: 'resource/app/angular/angularModule.html'
        },{
            title: 'Controllers',
            htmlRef: 'resource/app/angular/angularFormAndInput.html'
        },{
            title: 'Services',
            htmlRef: 'resource/app/angular/angularServices.html'
        },{
            title: 'Filters',
            htmlRef: 'resource/app/angular/angularFilters.html'
        },{
            title: 'Route',
            htmlRef: 'resource/app/angular/angularRoute.html'
        },{
            title: 'Directives',
            htmlRef: 'resource/app/angular/angularDirectives.html'
        }];

        self.specialSyntax = '{{}}';
    }]);
