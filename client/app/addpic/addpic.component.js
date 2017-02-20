'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './addpic.routes';

export class AddpicComponent {

  imageUrl = '';
  imageComment = '';

  // Instances of global objects
	$http;
	Auth;

  /*@ngInject*/
	constructor($http, Auth) {
		this.$http = $http;
		this.Auth = Auth;
	}

  addImage = function(){
    if(this.imageUrl.length < 1 || this.imageComment < 10) return; // Todo: show user invalid input
    // TODO: Check image contents (URL resolves to image)
    var newImage = {
      userId: this.Auth.getCurrentUserSync()._id,
      userName: this.Auth.getCurrentUserSync().name,
      imageUrl: this.imageUrl,
      imageComment: this.imageComment,
      countLike: 0,
      likes: []
    };
    this.imageUrl = '';
    this.imageComment = '';
    this.$http({
					url: '/api/pictures',
					method: "POST",
					data: newImage
				})
				.then(function(res) {
						console.log("Image added");
					},
					function(res) {
						console.log("Error while adding image to list");
					});
  }
}

/* IMPORTANT: must inject objects below to use http and authentication methods */
AddpicComponent.$inject = ['$http', 'Auth'];

export default angular.module('smgPinterestApp.addpic', [uiRouter])
  .config(routes)
  .component('addpic', {
    template: require('./addpic.html'),
    controller: AddpicComponent,
    controllerAs: 'addpicCtrl'
  })
  .name;
