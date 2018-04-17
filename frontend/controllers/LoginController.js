myApp.controller('LoginController',['$http','AuthToken',  '$route', '$location','pnotifyService', 'requestService', 'urlService' , function($http, AuthToken, $route, $location, pnotifyService, requestService, urlService){
	var main = this;

	this.submitSigninForm = function(form){
		// form validation check
		if(form.$invalid) {
			// error notification
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}
		main.loading = true;
		// http request to do login process
		requestService.postData(main.signin, urlService.baseUrl+'users/login').then(function successCallback(response){
			  main.loading = false;
              console.log(response);
              // setting jwt token to local storage after login
              AuthToken.setToken(response.data.token);
              // success notification
              pnotifyService.success('Success', 'Login Successfully!');
              // redirecting to ticket list page after login
              $location.path("/dashboard");
              $route.reload();
          },function errorCallback(response){
              main.loading = false;
              console.log(response);
              // error notification
              pnotifyService.error('Error', response.data.message);
          });
	}

  this.googleLogin = function(){
    window.location = "http://ec2-18-188-99-165.us-east-2.compute.amazonaws.com/auth/google/";
  }	

}]);