import { UserQueryRepository } from '../../user/infrastructure/userQueryRepository';
import { ICommandHandler } from "@nestjs/cqrs";
import { EmailAdapter } from '../adapter/email.adapter';
import { CodeConfiramtionRepository } from 'apps/src/user/infrastructure/codeConfirmationRepository';
export declare class RegistationCommand {
    username: string;
    password: string;
    email: string;
    constructor(username: string, password: string, email: string);
}
export declare class RegistationUseCase implements ICommandHandler<RegistationCommand> {
    protected readonly userQueryRepository: UserQueryRepository;
    protected readonly emailAdapter: EmailAdapter;
    protected readonly codeConfiramtionRepository: CodeConfiramtionRepository;
    constructor(userQueryRepository: UserQueryRepository, emailAdapter: EmailAdapter, codeConfiramtionRepository: CodeConfiramtionRepository);
    execute(command: RegistationCommand): Promise<any>;
}
