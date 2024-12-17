# contact-management-angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Setting Up a Project
  - Install the Angular CLI globally:
     npm install -g @angular/cli
  - run below command to install packages locally
     npm install
  
## Steps to run Development server
 - Change below URL for api in DataService
    private apiUrl = 'https://localhost:7152/api/v1/contact'; // Replace with your API URL
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## **A brief explanation of design decisions and application structure : **
- Separated http service business logic using interface and use dependency injection to inject in componenet. (Single responsibility)
- Reuse the http service at various places
  
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


