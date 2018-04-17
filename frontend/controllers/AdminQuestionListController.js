myApp.controller('AdminQuestionListController',['$anchorScroll', '$routeParams','AuthToken', '$location','pnotifyService', 'requestService', 'urlService', function($anchorScroll, $routeParams, AuthToken, $location, pnotifyService, requestService, urlService){
	var main = this;
  var token = AuthToken.getAdminToken();
	this.edit_question = false;
  //getting list of tests from database
  this.getTests = function(){
    requestService.getData(urlService.baseUrl+'admin/get-tests?token='+token).then(function successCallback(response){
      console.log(response.data); 
      main.tests = response.data;
    },function errorCallback(response){
              //console.log(response);
              console.log(response);
              // error notificaton
            });
  };

  // getting questions for a test

	this.getQuestions = function(){
		requestService.getData(urlService.baseUrl+'admin/get-questions/'+$routeParams.test+'?token='+token).then(function successCallback(response){
              console.log(response.data); 
              main.questions = response.data;
          },function errorCallback(response){
              //console.log(response);
              console.log(response);
              // error notificaton
          });
	};

  //getting a question to edit
  this.editQuestion = function(id){
    requestService.getData(urlService.baseUrl+'admin/get-single-question/'+id+'?token='+token).then(function successCallback(response){
      console.log(response.data); 
      main.question = response.data[0];
      main.edit_question = true;
      $anchorScroll();
    },function errorCallback(response){
      console.log(response);
    });
  };

  //calling server to update a question 
  this.updateQuestion = function(form, id){
    if(form.$invalid) {
      // error notification
      pnotifyService.error('Incorrect Fillup', 'Please fill up your form correctly!');
      return false;
    }
    this.loading = true;
    requestService.postData(main.question, urlService.baseUrl+'admin/update-question/'+id+'?token='+token).then(function successCallback(response){
      console.log(response.data);
      main.loading = false; 
      main.edit_question = false;
      main.getQuestions();
      pnotifyService.success('Success', response.data.msg);
    },function errorCallback(response){
      main.loading = false;
      pnotifyService.error('Error', 'Something Went Wrong');
      console.log(response);
              // error notificaton
    });
  };
  // requesting server to delete a question
  this.deleteQuestion = function(id){
    requestService.deleteData(urlService.baseUrl+'admin/question/delete/'+id+'?token='+token).then(function successCallback(response){
      console.log(response.data); 
      main.getQuestions();
      pnotifyService.success('Success', response.data.msg);
    },function errorCallback(response){
              pnotifyService.error('Error', 'Something Went Wrong');
              console.log(response);
            });
  };
	
}]);