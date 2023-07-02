export class UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string | null;

  constructor(firstName: string, lastName: string, email: string, password: string, dateOfBirth: string | null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
  }
}
