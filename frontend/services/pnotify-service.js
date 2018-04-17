//defining a pnotify service
myApp.service('pnotifyService',function(notificationService){
  
  //service to show success notification
  this.success = function(title,text){
    notificationService.notify({
      title: title,
      text: text,
      hide: true,
      type: 'success'
    });
  }

  //service to show info notification
  this.info = function(title,text){
    notificationService.notify({
      title: title,
      text: text,
      hide: true,
      type: 'info'
    });
  }

  //service to show error notification
  this.error = function(title,text){
    notificationService.notify({
      title: title,
      text: text,
      hide: true,
      type: 'error'
    });
  }

});