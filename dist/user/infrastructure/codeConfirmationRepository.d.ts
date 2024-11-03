import { PrismaServiceAuth } from "apps/src/auth/service/prisma.service";
export type IActionType = 'passwordRecovery' | 'register' | 'login';
export declare class CodeConfiramtionRepository {
    protected readonly prismaServiceAuth: PrismaServiceAuth;
    constructor(prismaServiceAuth: PrismaServiceAuth);
    updateOrCreateCode(userId: string | null | undefined, code: string, expirationDate: string, type: IActionType): Promise<string | null | undefined>;
}
