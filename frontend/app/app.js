var myApp = angular.module('quizApp', ['cp.ngConfirm', 'ngRoute', 'ui.tinymce','jlareau.pnotify', 'ngSanitize', 'angularMoment', 'ui.filters', 'ngMessages', 'ngFileUpload']);

//protecting auth routes

myApp.run(['$rootScope', '$location', 'Auth', 'notificationService', function ($rootScope, $location, Auth, notificationService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
    	if (next.$$route.protected === true) {
	        if (!Auth.isLoggedIn()) {
	        	if ($location.path() !=='/') {
		        	notificationService.notify({
						title: 'Unauthorized Entry',
						text: 'Please Login To Continue',
						hide: true,
						type:'notice'
					});

					$location.path('/');
				}
	            
	        }
	    }

	    if (next.$$route.admin === true) {
	        if (!Auth.isAdminLoggedIn()) {
	        	if ($location.path() !=='/admin-panel') {
		        	notificationService.notify({
						title: 'Unauthorized Entry',
						text: 'Please Login To Continue',
						hide: true,
						type:'notice'
					});

					$location.path('/admin-panel');
				}
	            
	        }
	    }    
    });
}]); 