myApp.controller('AdminPanelController',['$anchorScroll','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', '$route', function($anchorScroll, AuthToken, $location, pnotifyService, requestService, urlService, $route){
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
		requestService.postData(main.signin, urlService.baseUrl+'admin/login').then(function successCallback(response){
			  main.loading = false;
              console.log(response);
              // setting jwt token to local storage after login
              AuthToken.setAdminToken(response.data.token);
              // success notification
              pnotifyService.success('Success', 'Login Successfully!');
              // redirecting to ticket list page after login
              $location.path("/admin");
              $route.reload();
          },function errorCallback(response){
              main.loading = false;
              console.log(response);
              // error notification
              pnotifyService.error('Error', response.data.message);
          });
	}
}]);