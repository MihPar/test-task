import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InputUserModel } from './dto/inputUserMode';


@Controller('auth')
export class AuthController {
	constructor() {}

	@Post('/registration')
	@HttpCode(201)
	async registrationUser(@Body() inputModel: InputUserModel) {
		
	}
}