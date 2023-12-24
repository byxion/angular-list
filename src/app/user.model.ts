export class User {
  id!: number;
  name!: string;
  occupation!: string;
  email!: string;
  bio!: string;
  password!: string;

  constructor(id: number, name: string, occupation: string, email: string, bio: string, password: string) {
    this.id = id;
    this.name = name;
    this.occupation = occupation;
    this.email = email;
    this.bio = bio;
    this.password = password;
  }
}
