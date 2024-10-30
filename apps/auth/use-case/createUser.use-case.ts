import { add } from 'date-fns/add';
import { IUserViewModel } from '../dto/auth.dto';
import { Injectable } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";
import { IUserInputModel } from "../dto/auth.dto";
import { QueryRepository } from '../infrastructura/auth.repositoryQuery';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { EmailAdapter } from '../wrapper.ts/email-manager/email-manager';

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
		protected queryRepository: QueryRepository,
		protected emailAdapter: EmailAdapter
    ) { }

    async execute(command: UseCaseArg): Promise<UseCaseResponse> {
        const { email, username, password } = command
        const exist = await this.queryRepository.checkExistUser({ email, username })
        if (exist.email === 'exist') return { status: 'error', errorType: 'existed_email' }
        if (exist.username === 'exist') return { status: 'error', errorType: 'existed_login' }

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)

        const newCode = uuidv4()
        const expirationDate = add(new Date(), {
            minutes: 20
        }).toISOString()

        const res = await this.emailAdapter.sendEmailByRecoveryCode(email, newCode).catch(e => {
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