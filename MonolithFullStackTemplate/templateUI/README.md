# TemplateUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.
This is the ui for the market engine application


# Ideas 
Look here for form bricks
https://github.com/formbricks/formbricks

Look here for rating samples
https://github.com/clickvote/clickvote

Look here for state management with Signals
https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf
and here `https://www.stefanos-lignos.dev/posts/ngrx-signals-store`

## Imports

###### Angular Material
ng add @angular/material

###### Gesture Hammer JS
npm install --save hammerjs
Followed by adding it to the main.ts file

###### Angular Material icons
added
`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
to the index.htm head section

###### Lodash
npm install lodash --save
npm install @types/lodash --save-dev

###### Moment
    npm install --save moment 
    usage 
        import * as moment from 'moment';
        let myMoment: moment.Moment = moment("someDate");

###### Luxon
    `npm install --save luxon luxon-angular`
    `npm i --save-dev @types/luxon`

###### JWT decoder
    npm i --save @types/jwt-decode
    npm i jwt_decode
    usage 
        var token = 'eyJ0eXAiO.../// jwt token';
         
        var decoded = jwt_decode(token);
        console.log(decoded);
         
        /* prints:
         * { foo: "bar",
         *   exp: 1393286893,
         *   iat: 1393268893  }
         */
###### translation
The tutorial can be found here
https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
it uses the ngxTranslation service

Run the following command
```
npm install @ngx-translate/core @ngx-translate/http-loader rxjs --save
```

##### ngRx Signals
```ng add @ngrx/store```
See this cheat sheet on signal store `https://www.stefanos-lignos.dev/posts/ngrx-signals-store`

##### story books
Tutorial can be found here `https://storybook.js.org/docs/get-started/install`
run ```npx storybook@latest init``` to install
run ```npm run storybook``` to run the server


##### Capacitor 
`npm install @capacitor/core`
`npm install @capacitor/cli --save-dev`


### Mobile Capacitor
For this we are using Ionic Capacitor to deploy the application as a mobile app.
In a nutshell the website is here `https://capacitorjs.com/solution/angular` all that it does, 
Create ios and Android apps, build the code as prod and sync to capacitor, then it creates ionic-angular-android app

Run `npx cap init` to initialize the mobile app Follow the instructions by filling in details 
The command above will create the capacitor.config file within the project, 
check its values and make sure that the webDir folder is set correctly Eg

```js
const config: CapacitorConfig = {
appId: 'com.wiltech.capacitor',
appName: 'angular-ionic-capacitor',
webDir: 'dist/angular-ionic-capacitor/browser',
};
```

Next build the app as prod to get the DISt files created 
`ng build --configuration production`

The next step is to add he mobile platforms (apple and android) run 
`npm install @capacitor/ios @capacitor/android`

Then add each platform individually 
`npx cap add ios`
`npx cap add android`

NEXT run the command to open the editor 
`npx cap open ios` 
`npx cap open android`

Now we can install plugins PS after any plugin is installed we need to sync the app by running 
`npx cap sync`

Capacitor plugins
Camera`npm install @capacitor/camera`


## Creating lazily loading modules
    ```
    ng generate module moduleName --route routeName --module app.module
    ```


### Resoruces
##### images
`https://www.istockphoto.com/search/2/image?phrase=booking&mediatype=photography&irgwc=1&cid=IS&utm_medium=affiliate_SP&utm_source=FreeImages&clickid=243zxH1NdxyPWjLz67xZCWaxUkFRFzTFxxTGRU0&utm_term=booking&utm_campaign=home_freephoto_searchbar-popup&utm_content=270498&irpid=246195`

##### mockUps
https://www.freepik.com/free-photos-vectors/survey
https://www.mockupworld.co/free/category/
https://www.ls.graphics/
https://unblast.com/taxi-booking-ui-components-template-sketch/ FREE MOCK UPS
https://shots.so/


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
