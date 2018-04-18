myApp.controller('SignupController',[ '$http', '$q', 'pnotifyService','$location','requestService','urlService', function($http, $q, pnotifyService,$location, requestService, urlService){
	var main = this;

	this.submitSignupForm = function(form){
		if(form.$invalid) {
			// checking form validation
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}

		main.loading = true;
		// http request for saving user data to database
		requestService.postData(main.signup, urlService.baseUrl+'users/register').then(function successCallback(response){
              //console.log(response);
              main.loading = false;
              // success notification
              pnotifyService.success('Success', 'You have successfully created an account, login to continue!');
              console.log(response);
              // after signup , sending user to login page 
              $location.path('/');
          },function errorCallback(response){
              //console.log(response);
              main.loading = false;
              console.log(response);
              // error notification
              pnotifyService.error('Error', response.data.message.message);
        });
	}

  this.googleLogin = function(){
    window.location = "http://ec2-18-188-99-165.us-east-2.compute.amazonaws.com/auth/google/";
  }

}]);