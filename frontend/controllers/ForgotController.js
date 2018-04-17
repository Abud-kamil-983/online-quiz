myApp.controller('ForgotController',['$http','AuthToken',  '$q', '$location','pnotifyService','requestService', 'urlService' , function($http, AuthToken, $q, $location, pnotifyService, requestService, urlService){
	var main = this;
	this.submitForgotForm = function(form){
		if(form.$invalid) {
			// error notification
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}
		main.loading = true;
		// http request to send mail for reset
		requestService.postData(main.reset, urlService.baseUrl+'users/forgot-password').then(function successCallback(response){
			  main.loading = false;
              console.log(response);
              if (response.data.message == 'user not found') {
              	// error notification
              	pnotifyService.error('Error', 'user not found');
          	  }else if (response.data.status == 'error'){
          	  	// error notification
          	  	pnotifyService.error('Error', 'Unable to send the mail,something went wrong');
          	  }else{
          	  	pnotifyService.success('Success', 'Successfully sent the mail, please visit your inbox');
          	  }
          },function errorCallback(response){
              //console.log(response);
              main.loading = false;
              console.log(response);
              // error notificaton
              pnotifyService.error('Error', 'Something went wrong!');
          });
	}	

}]);