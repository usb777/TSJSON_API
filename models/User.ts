import { Role } from "./Role";

export  class User 
{ userId: number;
  userName: string;
  password: string;  
  firstName: string;
  lastName: string;
  email: string;
  role: Role; // classn Object
  gender: string;
  constructor(userId:number, username:string,password: string, firstname:string,lastname:string,email:string,role:Role, gender:string)
  { this.userId  = userId;
    this.userName = username;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.role = role;
    this.gender = gender;
  } //constructor
}