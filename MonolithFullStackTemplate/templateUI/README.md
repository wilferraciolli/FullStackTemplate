# TemplateUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.
This is the ui for the market engine application

## Imports

######Angular Material
    ng add @angular/material
    
######Gesture Hammer JS
    npm install --save hammerjs 
Followed by adding it to the main.ts file   
    
######Angular Material icons
    added 
    `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` 
    to the index.htm head section
   
######Lodash
    npm install lodash --save
    npm install @types/lodash --save-dev   
    
###### Moment
    npm install --save moment 
    usage 
        import * as moment from 'moment';
        let myMoment: moment.Moment = moment("someDate");
                
###### JWT decoder
    npm i jwt-decode
    usage 
        var token = 'eyJ0eXAiO.../// jwt token';
         
        var decoded = jwt_decode(token);
        console.log(decoded);
         
        /* prints:
         * { foo: "bar",
         *   exp: 1393286893,
         *   iat: 1393268893  }
         */
    
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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Feature Folder structure
Each component will have the following

-package with feature name in plural
    -folder for each component
    -files for the feature
    
    Eg
    
    -users
        -user-details component
            user-profile component
            user-cars component
        -user-list component
        -user component
        -user-service.ts
        -user-response
        
## Folder structure

├── src
│   ├── app
│   │   ├── admin 
│   │   │   ├── directives
│   │   │   ├── pages
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── rights
│   │   │   │   │   ├── rights.component.ts
│   │   │   │   ├── user
│   │   │   │   │   ├── user.component.ts
│   │   │   │   ├── admin.component.ts
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.css
│   │   │   │   ├── index.ts
│   │   │   ├── pipes
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.routing.module.ts
│   │   │   ├── index.ts
│   │   ├── core
│   │   │   ├── models
│   │   │   │   ├── index.ts
│   │   │   │   ├── repos.ts
│   │   │   ├── services
│   │   │   │   ├── github.service.ts
│   │   │   │   ├── index.ts
│   │   │   ├── core.module.ts
│   │   │   ├── index.ts
│   │   ├── github
│   │   │   ├── pages
│   │   │   │   ├── repolist
│   │   │   │   │   ├── repolist.component.ts
│   │   │   │   │   ├── repolist.component.html
│   │   │   ├── github.routing.module.ts
│   │   │   ├── github.module.ts
│   │   │   ├── index.ts
│   │   ├── home
│   │   │   ├── pages
│   │   │   │   ├── aboutus
│   │   │   │   │   ├── about-us.component.ts
│   │   │   │   ├── contactus
│   │   │   │   │   ├── contact-us.component.ts
│   │   │   │   ├── home
│   │   │   │   │   ├── home-us.component.ts
│   │   │   │   ├── index.ts
│   │   │   ├── home-routing.module.ts
│   │   │   ├── home.module.ts
│   │   │   ├── index.ts
│   │   ├── shared
│   │   │   ├── layout
│   │   │   │   ├── footer
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   ├── footer.component.html
│   │   │   │   ├── header
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   ├── index.ts
│   ├── app-routing.module.ts  
│   ├── app-wildcard-routing.module.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── not-found.component.ts
