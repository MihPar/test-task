import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as AuthClient } from '@prisma/client';
export declare class PrismaServiceAuth extends AuthClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
