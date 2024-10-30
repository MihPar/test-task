import { AppModule } from 'apps/src/app.module';
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// applyAppSettings(app)
	// applySwaggerSettings(app);
	// connectMicroserviceAuth(app)
	// await app.startAllMicroservices();
	// const port = process.env.PORT || keysAuth.common.port.microservices.auth;
	await app.listen(3000);
}

bootstrap();