//controller to manage admin list ticket
myApp.controller('AdminTestController',['$http','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', function($http, AuthToken, $location, pnotifyService, requestService, urlService){
	var main = this;
	var token = AuthToken.getAdminToken();
	//saving a test to database
	this.submitTest = function(form){
		console.log(main.test);
		if(form.$invalid) {
			// error notification
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}
		main.loading = true;
		// http request to send mail for reset
		requestService.postData(main.test, urlService.baseUrl+'admin/save-test?token='+token).then(function successCallback(response){
			  main.loading = false;
              console.log(response); 
              main.test = {};
          	  pnotifyService.success('Success', 'Successfully saved');
          	  $location.path('/admin');
          },function errorCallback(response){
              //console.log(response);
              main.loading = false;
              console.log(response);
              // error notificaton
              pnotifyService.error('Error', 'Something went wrong!');
          });
	};
	
}]);