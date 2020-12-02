# GroceryTrackerFeNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

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
