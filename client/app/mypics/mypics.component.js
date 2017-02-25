'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mypics.routes';

export class MypicsComponent {
  $http;
  Auth;
  userID = '';
  userName = '';
  pictures = [];

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
  }

  $onInit() {
    this.$http.get('/api/pictures')
      .then(response => {
        if(this.Auth.isLoggedInSync()) {
          this.userID = this.Auth.getCurrentUserSync()._id;
          this.userName = this.Auth.getCurrentUserSync().name;
        }
        this.pictures = response.data;

        // Check if user has liked picture already
        this.pictures.reduce((acc, pic) => {

          if (pic.likes.filter((val) => val.userId === this.userID).length > 0)
            pic.hasLiked = true;  // Set user has liked the picture
          else 
            pic.hasLiked = false;  //user has not liked the picture yet
          return pic;
        },{});

        //console.log(JSON.stringify(this.pictures, undefined, 2));
      });
  }

  deletePic(picId){
    if (!this.Auth.isLoggedInSync()) return;

    console.log("removing pic: "+picId);
    this.$http.delete('/api/pictures/'+ picId)
      .then(res =>{
        console.log("pic removed");
      })
    
    this.pictures = this.pictures.filter((pic) => pic._id !== picId);
  }

}

export default angular.module('smgPinterestApp.mypics', [uiRouter]) // ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']
  .config(routes)
  .component('mypics', {
    template: require('./mypics.html'),
    controller: MypicsComponent,
    controllerAs: 'mypicsCtrl',
  })
  .name;

