import { IInputRegistrationType } from "./dto/auth.dto";
import { CreateUser } from "./use-case/createUser.use-case";
export declare class AuthController {
    protected ucCreateUser: CreateUser;
    constructor(ucCreateUser: CreateUser);
    registration(body: IInputRegistrationType): Promise<import("./dto/auth.dto").IUserViewModel | "existed_email" | "existed_login">;
}
