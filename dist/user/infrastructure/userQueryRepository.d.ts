import { User } from '@prisma/client';
import { PrismaServiceAuth } from 'apps/src/auth/service/prisma.service';
export declare class UserQueryRepository {
    protected readonly prismaServiceAuth: PrismaServiceAuth;
    constructor(prismaServiceAuth: PrismaServiceAuth);
    getUser(email: string, username: string): Promise<User | null | undefined>;
    createUser(data: {
        auth: {
            email: string;
            username: string;
            passwordHash: string;
            passwordSalt: string;
            isConfirm: boolean;
        };
    }): Promise<string | null | undefined>;
}
