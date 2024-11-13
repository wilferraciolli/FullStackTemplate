import {UserProfile, UserRoleType} from "../classes/user.profile";
import {UserSetting} from "../classes/user-settings-available";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";
import {UserProfileLinks} from "../classes/user.profile-links";
import {Link} from "../../shared/response/link";

export const GUEST_USER_PROFILE: UserProfile = new UserProfile(
  'id',
  'personId',
  UserRoleType.GUEST,
  'Guest',
  'User',
  ['GUEST'],
  new UserProfileLinks(new Link('selfLink')),
  null
);

type UserState = {
  userProfile: UserProfile | null;
  userLocale: UserSetting;
  userLanguage: UserSetting;
};

const initialState: UserState = {
  userProfile: GUEST_USER_PROFILE,
  userLocale: UserSetting.englishLocale,
  userLanguage: UserSetting.englishLanguage
}

export const UserSessionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    selectedUserProfile: computed(() => store.userProfile())
  })),
  withMethods((store) => ({
    updateUserProfile(userProfile: UserProfile): void {
      patchState(store, (state) => ({userProfile}))
    }
  }))
);
