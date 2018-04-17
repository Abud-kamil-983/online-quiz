myApp.controller('AdminUserController',['$http','AuthToken',  '$route', '$location','pnotifyService','requestService', 'urlService' , function($http, AuthToken, $route, $location, pnotifyService, requestService, urlService){
	var main = this;
  var token = AuthToken.getAdminToken();
  this.loadingfull = true;
  //getting list of all registered user
  this.getUsers = function(){
    requestService.getData(urlService.baseUrl+'admin/get-users?token='+token).then(function successCallback(response){
      main.loadingfull = false;
      console.log(response.data); 
      main.users = response.data;
    },function errorCallback(response){
              main.loadingfull = false;
              //console.log(response);
              console.log(response);
              // error notificaton
            });
  };

  // getting test result of a user
  this.getUserTest = function(id){
    this.loadingfull = true;
    main.test_details = true;
    requestService.getData(urlService.baseUrl+'admin/get-user-score/'+id+'?token='+token).then(function successCallback(response){
              main.loadingfull = false;
              console.log(response.data);
              main.tests = response.data; 
          },function errorCallback(response){
              main.loadingfull = false;
              console.log(response);
              // error notificaton
          });
  };

  this.goBack = function(){
    $route.reload();
  };

	

}]);