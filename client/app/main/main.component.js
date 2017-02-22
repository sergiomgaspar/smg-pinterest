import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  Auth;
  userID = '';
  userName = '';
/*
  bricks=[
    {src: "http://ignitersworld.com/lab/angulargrid/images/1.jpg", likes: 2, imageId: 7},
    {src: "http://ignitersworld.com/lab/angulargrid/images/5.jpg", likes: 2, imageId: 6},
    {src: "http://ignitersworld.com/lab/angulargrid/images/6.jpg", likes: 2, imageId: 5},
    {src: "http://ignitersworld.com/lab/angulargrid/images/7.jpg", likes: 2, imageId: 4},
    {src: "http://ignitersworld.com/lab/angulargrid/images/8.jpg", likes: 2, imageId: 3},
    {src: "http://ignitersworld.com/lab/angulargrid/images/9.jpg", likes: 2, imageId: 2},
    {src: "https://i.ytimg.com/vi/icqDxNab3Do/maxresdefault.jpg", likes: 2, imageId: 1}];*/
    
  pictures = [];

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
  }

  $onInit() {
    this.$http.get('/api/pictures')
      .then(response => {
        // todo: Add field "userLiked" to identify if user has liked pic already
        // In html, use ng-show/hide along with CSS (hover property)
        this.pictures = response.data;
      });
    this.userID = this.Auth.getCurrentUserSync()._id;
    this.userName = this.Auth.getCurrentUserSync().name;
  }

  like(imageId){
    console.log("like: "+imageId);
    console.log("ID: "+this.userID);
    console.log("Name: "+this.userName);

    this.$http.put('/api/pictures/'+imageId, )
			.then(function(response) {
					console.log("User going to venue.");
				},
				function(response) { // optional
					console.log("Error while posting event.");
				});
  }
}

// var msnry = new Masonry( '.grid', {
//   columnWidth: 200,
//   itemSelector: '.grid-item'
// });
/*
// init Masonry
var grid = $('.grid').masonry({
  // options...
});
// layout Masonry after each image loads
grid.imagesLoaded().progress( function() {
  grid.masonry('layout');
});*/

//MainController.$inject = ['$http', 'angularGrid'];
 
export default angular.module('smgPinterestApp.main', [uiRouter, 'angularGrid'])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainCtrl'
  })
  .name;
