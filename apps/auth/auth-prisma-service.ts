import dotenv from 'dotenv';
dotenv.config();
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as AuthClient } from '../../prisma/client';


@Injectable()
export class PrismaServiceAuth extends AuthClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        super({
            datasources: { db: process.env.DATABASE_URL_TEST_TASK },
        });
    }
}