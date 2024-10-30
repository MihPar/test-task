import { Module } from '@nestjs/common';
import { AuthController } from '../auth.contorller';
import { ConfigModule } from '@nestjs/config';
import databaseConf, { DatabaseConfig } from '/Users/mihailparamonov/Documents/programmer/it-incubator/test-task/apps/auth/db.config'

@Module({
  imports: [
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: ".env",
		load: [databaseConf]
	  }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
