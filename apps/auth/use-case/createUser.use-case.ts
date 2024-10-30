import { IUserViewModel } from '../dto/auth.dto';
import { Injectable } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";
import { IUserInputModel } from "../dto/auth.dto";
import { QueryRepository } from '../infrastructura/auth.repositoryQuery';
import bcrypt from "bcrypt";

type UseCaseArg = IUserInputModel

type result = IUserViewModel | null | 'existed_email' | 'existed_login'


type UseCaseResponse =
    | { status: 'success', payload: result }
    | { status: 'error', errorType: 'existed_email' }
    | { status: 'error', errorType: 'existed_login' }
    | { status: 'error', errorType: 'error_send_email' }

@Injectable()
export class CreateUser implements ICommandHandler {
    constructor(
		protected queryRepository: QueryRepository
    ) { }

    async execute(command: UseCaseArg): Promise<UseCaseResponse> {
        const { email, username, password } = command
        const exist = await this.queryRepository.checkExistUser({ email, username })
        if (exist.email === 'exist') return { status: 'error', errorType: 'existed_email' }
        if (exist.username === 'exist') return { status: 'error', errorType: 'existed_login' }

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.authServiceForUseCase.GenerateHashPassword(password, passwordSalt)

        const newCode = uuidv4()
        const expirationDate = add(new Date(), {
            minutes: this.keys.keys.codeConfirmRegisterMinutes,
        }).toISOString()

        const res = await this.emailManager.sendEmail(email, newCode, 'Registration').catch(e => {
            console.log('Error EmailManager.SendEmail', e)
            return null
        })
        if (res === null) return { status: 'error', errorType: 'error_send_email' }

        const newUserId = await this.userRepositories.createUser({
            auth: {
                email,
                username,
                passwordHash,
                passwordSalt,
                isConfirm: false
            },
        })

        interceptForTest.userId(newUserId) // функция для теста

        await this.codeConfirmationRepositories.updateOrCreateCode(
            newUserId,
            newCode,
            expirationDate,
            "register"
        )

        const user = await this.userRepositoryQuery.getUserById(newUserId)
        return { status: 'success', payload: user }
    }
}