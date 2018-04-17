myApp.controller('DashboardController',['Auth','AuthToken', '$route', '$location','pnotifyService','requestService', 'urlService' , function(Auth, AuthToken, $route, $location, pnotifyService, requestService, urlService){
	var main = this;
  //getting loggedin user data
	requestService.getData(urlService.baseUrl+'test/me?token='+AuthToken.getToken()).then(function successCallback(response){
              console.log(response); 
              main.user = response.data;
              main.getUserTest(main.user._id);
          },function errorCallback(response){
              console.log(response);
              // error notificaton
          });
  // getting the test scores of a user
	this.getUserTest = function(id){
		console.log(id);
		requestService.getData(urlService.baseUrl+'test/get-user-score/'+id+'?token='+AuthToken.getToken()).then(function successCallback(response){
              console.log(response.data);
              var totalScore = 0;
              var totalQuestions = 0;
              for (var i = 0; i<response.data.length; i++) {
              	totalScore = totalScore + response.data[i].score;
              	totalQuestions = totalQuestions + response.data[i].totalQuestions;
              }
              main.totalQuestions = totalQuestions
              main.totalScore = totalScore;
              main.tests = response.data; 
          },function errorCallback(response){
              console.log(response);
              // error notificaton
          });
	};

  // getting result of a single test
	this.showTestDetails = function(id){
		main.test_details = true;
		requestService.getData(urlService.baseUrl+'test/get-score/'+id+'?token='+AuthToken.getToken()).then(function successCallback(response){
              console.log(response.data);
              main.score = response.data; 
          },function errorCallback(response){
              console.log(response);
              // error notificaton
          });
	};

	this.goBack = function(){
		$route.reload();
	};

	this.logout = function(){
		Auth.logout();
		pnotifyService.success('Logout', 'You successfully logout !')
		$location.path('/');
	}

}]);