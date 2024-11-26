import {APP_INITIALIZER, NgModule} from '@angular/core';
import {UserSessionInitializerService} from "./user-session.initializer.service";
import {SystemConfigInitializerService} from "./system-config.initializer.service";


export function initializeUserProfile(userSessionService: UserSessionInitializerService) {
  return (): Promise<void> => {
    return userSessionService.initUserSession();
  };
}

export function initializeAuth(userSessionService: UserSessionInitializerService) {
  return (): Promise<void> => {
    return userSessionService.initUserAuth();
  };
}

export function initializeSystemConfig(systemConfig: SystemConfigInitializerService) {
  return (): Promise<void> => {
    return systemConfig.initSystemConfiguration();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeUserProfile,
      deps: [UserSessionInitializerService],
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAuth,
      deps: [UserSessionInitializerService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeSystemConfig,
      deps: [SystemConfigInitializerService]
    },
  ],
})
export class InitializerModule {
}
