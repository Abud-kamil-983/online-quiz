myApp.controller('ResetController',['$routeParams', '$http','AuthToken',  '$q', '$location','pnotifyService', 'requestService','urlService', function($routeParams, $http, AuthToken, $q, $location, pnotifyService, requestService, urlService){
	var main = this;
	// token generated for changing password
	var resetToken = $routeParams.token;
	this.submitResetForm = function(form){
		// checking form validation
		if(form.$invalid) {
			// error notification
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}
		
		main.loading = true;
		// http request to reset password
		requestService.postData(main.reset, urlService.baseUrl+'users/reset/'+resetToken).then(function successCallback(response){
			main.loading = false;
			console.log(response);
			if (response.data.error == 'Password reset token is invalid or has expired.') {
				// error notification
				pnotifyService.error('Error', response.data.error);
				// if token expired, redirecting to forget password form 
				$location.path("/forgot-password");
			}else{
				// success notification
				pnotifyService.success('Success', response.data.message);
				// redirection to login page for login with new password
				$location.path("/");
			}
		},function errorCallback(response){
              main.loading = false;
              console.log(response);
              // error notification
              pnotifyService.error('Error', 'Something went wrong!');
          });
	}	

}]);