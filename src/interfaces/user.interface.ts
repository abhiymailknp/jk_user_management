import { Role } from "src/constants/constants";

export interface AddUser {
    userId : string;
    fullName : string;
    email :string;
    role ?: Role;
    createdAt : Date   
}

export interface TokenData {
    sub : string;
    email :string;
    role : Role;
    iat : number;
    exp : number;
}
