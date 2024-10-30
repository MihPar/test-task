import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
  } from '@nestjs/common';
  import { ConfigModule } from '@nestjs/config';
  import { PrismaClient } from '@prisma/client';
  import { ClientsModule } from '@nestjs/microservices';
import { authServiceConfig } from './auth/config/service.config';
import { AuthModule } from './auth/auth.module';
  
  
//   const services = [];
  const modules = [AuthModule];
  const controllers = [];
  const resolvers = [];
  
  @Module({
	imports: [
	  ConfigModule.forRoot({
		isGlobal: true,
	  }),
	  ClientsModule.registerAsync([authServiceConfig()]),
	  ...modules,
	//   ScheduleModule.forRoot(),
	//   GraphQLModule.forRoot<ApolloDriverConfig>({
	// 	driver: ApolloDriver,
	// 	autoSchemaFile: 'schema.gql',
	// 	path: '/api/v1/graphql',
	// 	playground: true,
	//   }),
	],
	controllers: [],
	providers: [],
  })
  export class AppModule {}

  