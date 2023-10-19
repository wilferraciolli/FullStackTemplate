import { Link } from '../shared/response/link';

export class PersonLinks {
  constructor(
    public self: Link,
    public updatePerson: Link | null,
    public deletePerson: Link | null,
    public people: Link | null,
    public createUpdatePersonPhoto?: Link | null,
    public downloadPersonPhoto?: Link | null
  ) {
  }
}
