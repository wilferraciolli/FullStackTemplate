import {APP_INITIALIZER, NgModule} from '@angular/core';
import {UserSessionInitializerService} from "./user-session.initializer.service";


export function initializeUserProfile(userSessionService: UserSessionInitializerService) {
  return (): Promise<void> => {
    return userSessionService.initUserSession();
  };
}


// TODO sample function to show app initializer
export function initializeApp2() {
  return (): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp2 called`);
      setTimeout(() => {
        console.log(`initializeApp2 Finished`);
        resolve();
      }, 2000);
    });
  };
}


@NgModule({
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: (config: UserSessionService) => {
    //     return () => {
    //       config.initUserSession();
    //       console.log('App initializer')
    //       return Promise<void>;
    //     };
    //   },
    //   deps: [UserSettingService],
    // },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeUserProfile,
      deps: [UserSessionInitializerService],
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeApp2
    },
  ],
})
export class InitializerModule {
}
