import { PrismaServiceAuth } from "apps/src/auth/service/prisma.service"


export type IActionType = 'passwordRecovery' | 'register' | 'login'

export class CodeConfiramtionRepository {
	constructor(
		protected readonly prismaServiceAuth: PrismaServiceAuth
	) {}

	async updateOrCreateCode( 
		userId: string | null | undefined,
        code: string,
        expirationDate: string,
        type: IActionType,
    ): Promise<string | null | undefined> {
		try {
			await this.prismaServiceAuth.$transaction(async (prisma) => {
				const _find = await prisma.codeConfirmation.findUnique({
					where: { userId_typeCode: { userId, typeCode: type } },
				})
				const _result = _find
					? await prisma.codeConfirmation.update({
						where: { userId_typeCode: { userId, typeCode: type } },
						data: { code, expirationDate, isConfirmed: false, }
					})
					: await prisma.codeConfirmation.create({
						data: {
							userId,
							code,
							expirationDate,
							typeCode: type,
							isConfirmed: false,
						},
					})
				return _result.id || '123'
			})

		} catch(error) {
			console.log("error", error)
			return null
		} finally{
			await this.prismaServiceAuth.$disconnect()
		}
        
    }
}