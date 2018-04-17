myApp.controller('AdminController',['Auth', '$anchorScroll','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', function(Auth, $anchorScroll, AuthToken, $location, pnotifyService, requestService, urlService){
	var main = this;
  //getting token from local storage
  var token = AuthToken.getAdminToken();
  this.edit_test = false;
  this.loadingfull = true;
  
  //get list of tests

  this.getTests = function(){
    requestService.getData(urlService.baseUrl+'admin/get-tests?token='+token).then(function successCallback(response){
      main.tests = response.data;
      main.loadingfull = false;
    },function errorCallback(response){
              main.loadingfull = false;
            });
  };

  // calling server to get single test based on id
  this.editTest = function(id){
    requestService.getData(urlService.baseUrl+'admin/get-single-test/'+id+'?token='+token).then(function successCallback(response){
      console.log(response.data); 
      main.test = response.data[0];
      main.test.allowed_time = parseInt(response.data[0].allowed_time);
      main.edit_test = true;
      $anchorScroll();
    },function errorCallback(response){
      pnotifyService.error('error', 'Something Went Wrong');
            });
  };

  //update test
  this.updateTest = function(form, id){
    if(form.$invalid) {
      // error notification
      pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
      return false;
    }
    main.loading = true;
    requestService.postData(main.test, urlService.baseUrl+'admin/update-test/'+id+'?token='+token).then(function successCallback(response){
      console.log(response.data);
      main.loading = false; 
      main.edit_test = false;
      main.getTests();
      pnotifyService.success('Success', response.data.msg);
    },function errorCallback(response){
              main.loading = false;
              pnotifyService.error('Error', 'Something Went Wrong');
              // error notificaton
            });
  };
  //callling server to delete test
  this.deleteTest = function(id){
    requestService.deleteData(urlService.baseUrl+'admin/test/delete/'+id+'?token='+token).then(function successCallback(response){
      main.getTests();
      pnotifyService.success('Success', response.data.msg);
    },function errorCallback(response){
              pnotifyService.error('Error', 'Something Went Wrong');
            });
  };
  // calling logout service
  this.logout = function(){
    Auth.adminLogout();
    pnotifyService.success('Logout', 'logout successfully.')
    $location.path('/admin-panel');
  }
	
}]);