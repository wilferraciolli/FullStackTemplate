import {UserProfile, UserRoleType} from "../classes/user.profile";
import {UserSetting} from "../classes/user-settings-available";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";
import {UserProfileLinks} from "../classes/user.profile-links";
import {Link} from "../../shared/response/link";
import {IAuthDetails} from "../interfaces/IAuthDetails";

export const GUEST_USER_PROFILE: UserProfile = new UserProfile(
  'id',
  'personId',
  'guest@guest.com',
  'Guest',
  'User',
  [UserRoleType.GUEST],
  new UserProfileLinks(new Link('selfLink')),
  null
);

type UserState = {
  userProfile: UserProfile | null;
  userAuth: IAuthDetails | null;
  userLocale: UserSetting;
  userLanguage: UserSetting;
};

const initialState: UserState = {
  userProfile: GUEST_USER_PROFILE,
  userAuth: null,
  userLocale: UserSetting.englishLocale,
  userLanguage: UserSetting.englishLanguage
}

export const UserSessionStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((store) => ({
    selectedUserProfile: computed(() => store.userProfile()),
    isUserLoggedOn: computed(() => store.userAuth() !== null),
    isGuestUser: computed(() => store.userProfile()?.roleIds.includes(UserRoleType.GUEST))
  })),
  withMethods((store) => ({
    updateUserProfile(userProfile: UserProfile | null): void {
      patchState(store, (state) => ({userProfile}))
    },
    updateUserAuth(userAuth: IAuthDetails | null): void {
      patchState(store, (state) => ({userAuth}))
    },
    updateUserLanguage(setting: UserSetting): void {
      patchState(store, (state) => ({userLanguage: setting}))
    },
    updateUserLocale(setting: UserSetting): void {
      patchState(store, (state) => ({userLocale: setting}))
    }
  })),
  withHooks((store) => {
    return {
      onInit() {
        console.log('*********** store instantiated ')
      }
    }
  })
);
