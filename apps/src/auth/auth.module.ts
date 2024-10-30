import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { authServiceConfig } from "./config/service.config";
import { AuthController } from "./auth.controller";


@Module({
	imports: [CqrsModule, ClientsModule.registerAsync([authServiceConfig()])],
	controllers: [AuthController],
	providers: [],
	exports: [],
  })
  export class AuthModule {}