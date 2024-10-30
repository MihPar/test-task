import { User } from "../prisma/client";
export declare class IInputRegistrationType {
    username: string;
    password: string;
    email: string;
}
export declare class IUserInputModel {
    username: string;
    password: string;
    email: string;
}
export type IUserViewModel = Pick<User, "id" | "username" | "email" | "createdAt">;
