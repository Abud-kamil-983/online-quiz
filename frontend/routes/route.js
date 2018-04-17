myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/sign-in.html',
		controller: 'LoginController',
		protected:false
	}).
	when('/sign-up', {
		templateUrl: 'views/sign-up.html',
		controller: 'SignupController',
		protected:false
	}).
	when('/forgot-password', {
		templateUrl: 'views/forgot.html',
		controller: 'ForgotController',
		protected:false
	}).
	when('/reset/:token', {
		templateUrl: 'views/reset.html',
		controller: 'ResetController',
		protected:false
	}).when('/google/:token', {
		template: ' ',
		controller: 'GoogleController',
		protected:false
	}).
	when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardController',
		protected:true
	}).
	when('/admin', {
		templateUrl: 'views/admin.html',
		controller: 'AdminController',
		admin:true
	}).
	when('/admin-panel', {
		templateUrl: 'views/admin-panel.html',
		controller: 'AdminPanelController',
		admin:false
	}).
	when('/admin/add-question', {
		templateUrl: 'views/add-question.html',
		controller: 'AdminQuestionController',
		admin:true
	}).
	when('/admin/add-test', {
		templateUrl: 'views/add-test.html',
		controller: 'AdminTestController',
		admin:true
	}).
	when('/admin/questions-list/:test', {
		templateUrl: 'views/questions-list.html',
		controller: 'AdminQuestionListController',
		admin:true
	}).
	when('/admin/users-list', {
		templateUrl: 'views/users-list.html',
		controller: 'AdminUserController',
		admin:true
	}).when('/dashboard/tests-list', {
		templateUrl: 'views/tests-list.html',
		controller: 'DashboardTestController',
		protected:true
	}).
	otherwise({
		redirectTo: '/'
	});
}]);