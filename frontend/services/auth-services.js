myApp.factory('AuthToken', function($window){
	var authTokenFactory = {};
	// storing jwt token to local storage
	authTokenFactory.setToken = function(token){
		$window.localStorage.setItem('token',token);
	};
	// retreiving token from local storegae
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};

	authTokenFactory.setAdminToken = function(token){
		$window.localStorage.setItem('admin_token',token);
	};
	// retreiving token from local storegae
	authTokenFactory.getAdminToken = function(){
		return $window.localStorage.getItem('admin_token');
	};


	return authTokenFactory;
});

myApp.factory('getAuthUser', function($http, urlService, AuthToken){
	var data = {};
		var promise = $http.get(urlService.baseUrl+'test/me?token='+AuthToken.getToken(), { cache: true }).then(function(response){
		 	data =  response.data;
		 });
		return data;
});


myApp.factory('Auth', function($http, AuthToken, urlService){
	var authFactory = {};
	// checking if user is loggedin
	authFactory.isLoggedIn = function(){
		if (AuthToken.getToken()) {
			return true;
		} else{
			return false;
		}
	};	

	authFactory.isAdminLoggedIn = function(){
		if (AuthToken.getAdminToken()) {
			return true;
		} else{
			return false;
		}
	};
	// getting auth user
	authFactory.getAuthUser = function(){
		      var data = {};
		if (AuthToken.getToken()) {
			var promise = $http.get(urlService.baseUrl+'test/me?token='+AuthToken.getToken()).then(function(data){
			 	data =  data;
			 });
			return data
		}
	}

	authFactory.logout = function(){
		localStorage.removeItem("token");
	}
	authFactory.adminLogout = function(){
		localStorage.removeItem("admin_token");
	}

	return authFactory;
});