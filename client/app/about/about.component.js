'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './about.routes';

/* ****************************************************************** */
/* aboutComponent                                                  	  */
/* Component to handle the about section of the page 		          */
/* Ideally would be JSON over http, but its static so manually created */
/*                                                                    */
/* date: 29/01/2017                                                   */
/* author: sergiomgaspar.dev@gmail.com                                */
/* version: 1.0                                                       */
/* ****************************************************************** */

export class AboutComponent {

	frontEndTech = [{
			techName: "HTML5",
			description: "Hypertext Markup Language revision 5 (HTML5) is a markup language for the structure and presentation of World Wide Web contents. HTML5 supports the traditional HTML and XHTML-style syntax and other new features in its markup. It is the standard programming language for describing the contents and appearance of Web pages.",
			url: "https://www.w3.org/TR/html5/",
			image: "assets/images/html5.png",
			alt_image: "HTML5 Logo"
		},
		{
			techName: "SASS",
			description: "Sass (Syntactically Awesome Style Sheets) is a scripting language that is interpreted into Cascading Style Sheets (CSS). ",
			url: "http://sass-lang.com/",
			image: "assets/images/sass.png",
			alt_image: "SASS Logo"
		},
		{
			techName: "AngularJS",
			description: "AngularJS is a complete JavaScript-based open-source front-end web application framework mainly maintained by Google and targetting the development of SPA (Single Page Applications).The AngularJS framework works by first reading the HTML page, which has embedded into it additional custom tag attributes. Angular interprets those attributes as directives to bind input or output parts of the page to a model that is represented by standard JavaScript variables. The values of those JavaScript variables can be manually set within the code, or retrieved from static or dynamic JSON resources.",
			url: "https://angular.io/",
			image: "assets/images/angularjs.png",
			alt_image: "Angular Logo"
		},
		{
			techName: "Bootstrap",
			description: "Bootstrap is a free and open-source front-end web framework for designing websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions. Unlike many web frameworks, it concerns itself with front-end development only.",
			url: "http://getbootstrap.com/",
			image: "assets/images/boostrap.png",
			alt_image: "Bootstrap Logo"
		}
	];

	backEndTech = [{
			techName: "Javascript",
			description: "JavaScript is a high-level, dynamic, untyped, and interpreted programming language. It has been standardized in the ECMAScript language specification. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production; the majority of websites employ it, and all modern Web browsers support it without the need for plug-ins. JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles.",
			url: "https://www.javascript.com/",
			image: "assets/images/javascript.png",
			alt_image: "Javascript Logo"
		},
		{
			techName: "Node.JS",
			description: "Node.js is an open-source, cross-platform JavaScript runtime environment for developing a diverse variety of tools and applications. Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript. The runtime environment interprets JavaScript using Google's V8 JavaScript engine.",
			url: "https://nodejs.org/",
			image: "assets/images/nodejs.png",
			alt_image: "Javascript Logo"
		},
		{
			techName: "Express.JS",
			description: "Express.js, is an open-source web application framework for Node.js. It is designed for building web applications and APIs. It has become the standard server framework for Node.js.",
			url: "http://expressjs.com/",
			image: "assets/images/express.png",
			alt_image: "Express Logo"
		},
		{
			techName: "MongoDB",
			description: "MongoDB (from humongous) is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.",
			url: "https://www.mongodb.com/",
			image: "assets/images/mongodb.png",
			alt_image: "MongoDB Logo"
		}
	];

	miscTech = [{
			techName: "Gulp.JS",
			description: "Gulp.JS is an open-source JavaScript toolkit used as a streaming build system in front-end web development. It is a task runner built on Node.js and Node Package Manager (npm), used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, optimization etc.",
			url: "https://babeljs.io/",
			image: "assets/images/gulp.png",
			alt_image: "Gulp.JS Logo"
		},
		{
			techName: "Babel.JS",
			description: "Babel.JS is a JavaScript compiler that allows for the use of the ES6 (aka ECMAScript 2015) in development while deploying older browser compatible Javascript code.",
			url: "https://babeljs.io/",
			image: "assets/images/babel.png",
			alt_image: "Babel.JS Logo"
		},
		{
			techName: "Webpack",
			description: "Webpack is an open-source JavaScript module bundler. Webpack takes modules with dependencies and generates static assets representing those modules. It takes the dependencies and generates a dependency graph allowing the use of a modular approach for web application development purposes. The bundler can be used from the command line, or can be configured using a config file which is named webpack.config.js.",
			url: "https://webpack.github.io/",
			image: "assets/images/webpack.png",
			alt_image: "Webpack Logo"
		},
		{
			techName: "Mocha",
			description: "Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.",
			url: "https://mochajs.org/",
			image: "assets/images/mocha.png",
			alt_image: "Mocha Logo"
		},
		{
			techName: "Yoeman",
			description: "Yeoman is an open source client-side development stack, consisting of tools and frameworks intended to help developers build web applications. Yeoman runs as a command-line interface written for Node.js and which combines several functions into one place, such as generating a starter template, managing dependencies, running unit tests, providing a local development server, and optimizing production code for deployment.",
			url: "http://yeoman.io/",
			image: "assets/images/yeoman.png",
			alt_image: "Yeoman Logo"
		},
		{
			techName: "GIT",
			description: "Git is a version control system (VCS) for tracking changes in computer files and coordinating work on those files among multiple people. It is primarily used for software development, but it can be used to keep track of changes in any files. As a distributed revision control system it is aimed at speed, data integrity, and support for distributed, non-linear workflows.",
			url: "https://git-scm.com/",
			image: "assets/images/git.png",
			alt_image: "Git Logo"
		},
		{
			techName: "GitHub",
			description: "GitHub is a web-based Git and Internet hosting service. It offers all of the distributed version control and source code management (SCM) functionality of Git as well as adding its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.",
			url: "https://github.com/",
			image: "assets/images/github.png",
			alt_image: "GitHub Logo"
		},
		{
			techName: "Heroku",
			description: "Heroku is a cloud Platform-as-a-Service (PaaS) supporting several programming languages that is used as a web application deployment model. Heroku, one of the first cloud platforms, has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, Node.js, Scala, Clojure, Python, PHP, and Go. For this reason, Heroku is said to be a polyglot platform as it lets the developer build, run and scale applications in a similar manner across all the languages.",
			url: "https://www.heroku.com/",
			image: "assets/images/heroku.png",
			alt_image: "Heroku Logo"
		},
		{
			techName: "mLab",
			description: "mLab is a fully managed cloud database service featuring automated provisioning and scaling of MongoDB databases, backup and recovery, 24/7 monitoring and alerting, web-based management tools, and expert support.",
			url: "https://mlab.com/",
			image: "assets/images/mlab.png",
			alt_image: "mLab Logo"
		},
	];
}

export default angular.module('smgVotingAppApp.about', [uiRouter])
	.config(routes)
	.component('about', {
		template: require('./about.html'),
		controller: AboutComponent
	})
	.name;