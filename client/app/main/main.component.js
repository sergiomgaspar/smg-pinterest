import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
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

  defaultImage(img) {
    console.log("AAAAAAAAAAAAAAAAA");
    img.onerror = "";
    img.src = 'assets/images/no_photo.jpg';
  };

  like(imageId){
    
    if (!this.Auth.isLoggedInSync()) return;
    
    console.log("User liked image: "+imageId);
    
    this.pictures.reduce((acc, pic) => {
      if (pic._id === imageId) {
        pic.countLike++;
        pic.hasLiked = true;  // Set user has liked picture
        pic.likes.push({userName:this.userName, userId: this.userID});
        return pic;
      }
      return acc;
    },{});
    var picToUpdate = this.pictures.filter((val) => val._id === imageId);

    this.$http.put('/api/pictures/'+imageId, picToUpdate[0])
			.then(function(response) {
					console.log("User going to venue.");
				},
				function(response) { // optional
					console.log("Error while posting event.");
				});
  }


  unLike(imageId){

    if (!this.Auth.isLoggedInSync()) return;

    console.log("User UNLIKED image: "+imageId);
    
    this.pictures.reduce((acc, pic) => {
      var tmp = pic.likes.filter((val) => val.userId !== this.userID);
      if (pic._id === imageId) {
        pic.countLike--;
        pic.hasLiked = false;  // Set user has liked picture
        pic.likes = tmp; //.push({userName:this.userName, userId: this.userID});
        return pic;
      }
      return acc;
    },{});
    var picToUpdate = this.pictures.filter((val) => val._id === imageId);

    this.$http.put('/api/pictures/'+imageId, picToUpdate[0])
			.then(function(response) {
					console.log("User going to venue.");
				},
				function(response) { // optional
					console.log("Error while posting event.");
				});
  }  
}

export default angular.module('smgPinterestApp.main', [uiRouter]) // , 'angularGrid'
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainCtrl'
  })
  .name
;
