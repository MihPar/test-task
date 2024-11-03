import  bcrypt  from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { UserQueryRepository } from '../../user/infrastructure/userQueryRepository';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { EmailAdapter } from '../adapter/email.adapter';
import { CodeConfiramtionRepository } from 'apps/src/user/infrastructure/codeConfirmationRepository';

export class RegistationCommand {
	constructor(
		public username: string, 
		public password: string, 
		public email: string
	) {}
}

@CommandHandler(RegistationCommand)
export class RegistationUseCase implements ICommandHandler<RegistationCommand> {
	constructor(
		protected readonly userQueryRepository: UserQueryRepository,
		protected readonly emailAdapter: EmailAdapter,
		protected readonly codeConfiramtionRepository: CodeConfiramtionRepository
	) {}
	async execute(command: RegistationCommand): Promise<any> {
		const {username, password, email} = command
		const findUser = await this.userQueryRepository.getUser(email, username)
		if(!findUser) throw new NotFoundException('404')

			const passwordSalt = await bcrypt.genSalt(10)
			const passwordHash: string = await bcrypt.hash(password, passwordSalt)

			const newCode = uuidv4()
			const expirationDate = add(new Date(), {
				minutes: 20,
			}).toISOString()

		const res = await this.emailAdapter.sendEmailByRecoveryCode(email, newCode).catch(e => {
            console.log('Error EmailManager.SendEmail', e)
            return null
        })

		const newUserId = await this.userQueryRepository.createUser({
            auth: {
                email,
                username,
                passwordHash,
                passwordSalt,
                isConfirm: false
            },
        })

		await this.codeConfiramtionRepository.updateOrCreateCode(
            newUserId,
            newCode,
            expirationDate,
            "register"
        )
	}
}