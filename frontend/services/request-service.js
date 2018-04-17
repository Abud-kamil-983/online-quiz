//defining a pnotify service
myApp.service('requestService',function($http){
  
  // service to fetch data from database
  this.getData = function(url){
    return $http({
      method: 'GET',
      url: url,
      headers: {'Content-Type': 'application/json','Accept':'application/json'}
    });
  }
  // service to post data to database
  this.postData = function(data, url){
    return $http({
      method: 'POST',
      url: url,
      data:data,
      headers: {'Content-Type': 'application/json','Accept':'application/json'}
    });
  }
  this.putData = function(url){
    return $http({
      method: 'PUT',
      url: url,
      headers: {'Content-Type': 'application/json','Accept':'application/json'}
    });
  }

  this.deleteData = function(url){
    return $http({
      method: 'POST',
      url: url,
      headers: {'Content-Type': 'application/json','Accept':'application/json'}
    });
  }

});