"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeConfiramtionRepository = void 0;
class CodeConfiramtionRepository {
    constructor(prismaServiceAuth) {
        this.prismaServiceAuth = prismaServiceAuth;
    }
    async updateOrCreateCode(userId, code, expirationDate, type) {
        try {
            await this.prismaServiceAuth.$transaction(async (prisma) => {
                const _find = await prisma.codeConfirmation.findUnique({
                    where: { userId_typeCode: { userId, typeCode: type } },
                });
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
                    });
                return _result.id || '123';
            });
        }
        catch (error) {
            console.log("error", error);
            return null;
        }
        finally {
            await this.prismaServiceAuth.$disconnect();
        }
    }
}
exports.CodeConfiramtionRepository = CodeConfiramtionRepository;
//# sourceMappingURL=codeConfirmationRepository.js.map