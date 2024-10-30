import { Controller, HttpCode, Post } from '@nestjs/common';


@Controller('auth')
class AuthController {
	constructor() {}

	@Post('registration')
	@HttpCode(201)
	async registrationUser(@Body() inputModel: InputUserModel) {}
}