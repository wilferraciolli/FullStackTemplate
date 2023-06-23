export interface UserProfileResponse {
  _data: {
    userProfile: {
      id: string;
      personId: string;
      firstName: string;
      lastName: string;
      links: {
        self?: {
          href: string
        },
        users: {
          href: string
        },
        people: {
          href: string
        },
        person: {
          href: string
        }
      };
    }
  };
  _metadata: {
    id: {
      readOnly: string,
      hidden: string
    },
    personId: {
      readOnly: string,
      hidden: string
    },
    firstName?: {
      readOnly: string,
      hidden: string
    },
    lastName?: {
      readOnly: string,
      hidden: string
    }
  };
  _metaLinks: {
    self: {
      href: string
    }
  };
}
