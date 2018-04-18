
myApp.controller('DashboardTestController',['Auth', 'socket', '$timeout', '$ngConfirm', 'AuthToken', '$location','pnotifyService', 'requestService', 'urlService','$route', function(Auth, socket, $timeout, $ngConfirm, AuthToken, $location, pnotifyService, requestService, urlService, $route){
	var main = this;
	var token = AuthToken.getToken();
	//getting loggedin user
	requestService.getData(urlService.baseUrl+'test/me?token='+AuthToken.getToken()).then(function successCallback(response){
              console.log(response.data); 
              main.user_id = response.data._id;
          },function errorCallback(response){
              console.log(response);
              // error notificaton
          });
	// initializing the correct and wrong answer variable
	this.score = 0;
	this.wrongAnswers = 0;
	this.answerTime = 0;
	//getting all the test
	this.getTests = function(){
		requestService.getData(urlService.baseUrl+'test/get-tests?token='+token).then(function successCallback(response){
			console.log(response.data);
			main.tests = response.data; 
		},function errorCallback(response){
			console.log(response);
		});
	};
	//opening an instrauction modal with details
	this.openModal = function(test){
		requestService.getData(urlService.baseUrl+'admin/get-questions/'+test._id+'?token='+token).then(function successCallback(response){
			var totalQuestions = response.data.length;
			$ngConfirm({
				icon: 'fa fa-info-circle',
				closeIcon: true,
				useBootstrap: false,
				title: 'instructions',
				content: `You have ${test.allowed_time} seconds to answer the ${totalQuestions} questions, after times up, your previous answer will be saved and window will get closed.`,
				theme: 'dark',
				buttons: {
					start: function(){
						// starting quiz
						main.startQuiz(test, totalQuestions);
					},

					cancel:function(){

					}
				}
			});
		},function errorCallback(response){
              //console.log(response);
              console.log(response);
              // error notificaton
          });
	};
	//getting all the questions
	this.getQuestions = function(test){
		requestService.getData(urlService.baseUrl+'admin/get-questions/'+test+'?token='+token).then(function successCallback(response){
              console.log(response.data); 
              main.startTime =  Date.now();
              var q = response.data[main.id];
              console.log(q);
				if(q) {
					main.question = q.question;
					main.options = q.choices;
					main.answer = q.answer;
					main.answerMode = true;
				} else {
					main.quizOver = true;
				}
          },function errorCallback(response){
              //console.log(response);
              console.log(response);
              // error notificaton
          });
	};

	// checking answer
	this.checkAnswer = function() {
		if (main.givenAnswers===undefined) {
			pnotifyService.error('Error', 'Select an answer!');
			return false;
		}

		main.endTime =  Date.now();

		if(main.givenAnswers == main.options[main.answer]) {
			//if answer true increase score
			main.score++;
			main.correctAns = true;
		} else {
			//if answer is wrong increase wthis variable
			main.wrongAnswers++;
			main.correctAns = false;
		}
		main.answerTime = (main.endTime-main.startTime)/1000;
		// firing event on each time answer is submitted
		socket.emit('updateScore', {
				test_id:main.test_id,
				score:main.score,
				wrong:main.wrongAnswers
		});

		main.answerMode = false;

	};

	//starting quiz function
	this.startQuiz = function(test, totalQuestions){
		socket.emit('insertScore',{
			test: test._id,
			user: main.user_id,
			totalQuestions:totalQuestions
		});

		//handling event from server
		socket.on('getScore', function(data){
				main.test_id = data.id;
		});
		main.totalQuestions = totalQuestions;
		main.startCount = 0; 
		//for timer 
	    main.startTimeout = function () {  
	        main.startCount = main.startCount + 1;  
	        mytimeout = $timeout(main.startTimeout, 1000);  
	    }  
   		main.startTimeout();
   		$timeout(endQuiz, test.allowed_time*1000);  
		main.test = test._id;
		main.id = 0;
        main.quizOver = false;
		main.inProgress = true;
		main.getQuestions(main.test);
	};

	function endQuiz() {
		$timeout.cancel(mytimeout);
		main.quizOver = true;  
	};
	//getting next question when user click next
	this.nextQuestion = function() {
		main.id++;
		main.getQuestions(main.test);
		main.answerTime = 0;

	};

	this.playAgain = function(){
		$timeout.cancel(endQuiz);  
		$route.reload();
	}
 	
}]);