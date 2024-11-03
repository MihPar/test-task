import { InputUserModel } from './dto/inputUserMode';
import { CommandBus } from '@nestjs/cqrs';
export declare class AuthController {
    protected readonly commandBus: CommandBus;
    constructor(commandBus: CommandBus);
    registrationUser(inputModel: InputUserModel): Promise<any>;
}
