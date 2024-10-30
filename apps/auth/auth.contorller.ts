import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IInputRegistrationType } from "./dto/auth.dto";
import { CreateUser } from "./use-case/createUser.use-case";
// import { CreateUser } from "./use-case/createUser.use-case";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		protected ucCreateUser: CreateUser,
	) {}

	@Post('registration')
	@HttpCode(201)
	async registration(
		@Body() body: IInputRegistrationType,
	) {
		const { email, username, password } = body
		const user = await this.ucCreateUser.execute({ email, username, password })
		if (user.status === 'success') return user.payload;
		if (user.status === 'error') throw new BadRequestException(user.errorType);
	}
}