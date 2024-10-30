import { IUserViewModel } from './../dto/auth.dto';
import { ICommandHandler } from "@nestjs/cqrs";
import { IUserInputModel } from "../dto/auth.dto";
import { QueryRepository } from '../infrastructura/auth.repositoryQuery';
type UseCaseArg = IUserInputModel;
type result = IUserViewModel | null | 'existed_email' | 'existed_login';
type UseCaseResponse = {
    status: 'success';
    payload: result;
} | {
    status: 'error';
    errorType: 'existed_email';
} | {
    status: 'error';
    errorType: 'existed_login';
} | {
    status: 'error';
    errorType: 'error_send_email';
};
export declare class CreateUser implements ICommandHandler {
    protected queryRepository: QueryRepository;
    constructor(queryRepository: QueryRepository);
    execute(command: UseCaseArg): Promise<UseCaseResponse>;
}
export {};
