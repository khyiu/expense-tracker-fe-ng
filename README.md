# GroceryTrackerFeNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Production server
The application is deployed in Github page and accessible [here]()

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Journey log
### Stage 1: integrate AWS Cognito for authentication

First approach I've considered was using AWS Amplify library but even though its documentation contains a section about how to integrate with 
an existing Cognito user pool, I could not get it working. Eventually, I was pretty sure it'd take me more time to figure out how to get AWS 
Amplify working, than manually integrating the OAuth code flow using my Cognito user pool.  
The steps I went through:
1. tweak Cognito to redirect to a certain route of this Angular app after successful login
1. implement a 'CanActivate' guard and a security service. The former relies on the latter to check whether the user is authenticated. 
   At Security service level, the current user is considered logged in when a Cognito login token is present. When it's not, the user is 
   redirected to the Cognito login page. Then, on successful login, the user is redirected to the configured (in AWS Cognito console) URL
   with a query param that contains the auth code.
1. after redirection from Cognito login page, we end up in the CanActivate guard again, but this time, the security service extract the OAuth code, 
calls the Cognito token endpoint to retrieve among others, the access token. This token will then be used to call back-end API methods.

### Stage 2: deploy to cloud platform

I was, initially thinking about deploying this Angular SPA in AWS but according to its official documentation, it does not support HTTPS. That's a problem since
AWS Cognito only supports HTTPS URLs for login redirection. 
AWS S3 document does explain that setting up an AWS Cloudfront instance in front of the S3 bucket will add support
of HTTPS but for simplicity sake, and since I've wanted to give it a shot for a while, I've decided to use Github page. 

The procedure to build and deploy an Angular application to Github page is straightforward and described in Angular documentation: 
[Deploy to Github page](https://angular.io/guide/deployment#deploy-to-github-pages).

To summarize:
1. execute `ng build --prod --output-path docs --base-href /grocery-tracker-fe-ng/`
1. create a copy of `index.html` and name it `404.html` (purpose is explained in the Angular documentation)
1. commit and push those changes to the branch that is configured to be the input for Github Page


In a further step, I'll try to integrate the deployment in a CI/CD process.
