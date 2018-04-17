//controller to manage admin list ticket
myApp.controller('GoogleController',['$routeParams','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', function($routeParams, AuthToken, $location, pnotifyService, requestService, urlService){
	AuthToken.setToken($routeParams.token);
	$location.path("/dashboard");

	
}]);