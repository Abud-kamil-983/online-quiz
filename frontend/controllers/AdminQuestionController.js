myApp.controller('AdminQuestionController',['$http','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', function($http, AuthToken, $location, pnotifyService, requestService, urlService){
	var main = this;
  var token = AuthToken.getAdminToken();
	this.getTests = function(){
		requestService.getData(urlService.baseUrl+'admin/get-tests?token='+token).then(function successCallback(response){
              console.log(response.data); 
              main.tests = response.data;
          },function errorCallback(response){
              //console.log(response);
              console.log(response);
              // error notificaton
          });
	}

	this.submitQuestion = function(form){
		if(form.$invalid) {
			// error notification
			pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
			return false;
		}
		main.loading = true;
		// http request to send mail for reset
		requestService.postData(main.question, urlService.baseUrl+'admin/save-question/'+main.question.test+'?token='+token).then(function successCallback(response){
			  main.loading = false;
              console.log(response); 
              main.question = {};
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