import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InputUserModel } from './dto/inputUserMode';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiErrorMessage } from './exeption';
import { CommandBus } from '@nestjs/cqrs';
import { RegistationCommand } from './user-case/registration.use-case';


@Controller('auth')
export class AuthController {
	constructor(
		protected readonly commandBus: CommandBus
	) {}

	@ApiOperation({ summary: 'registration user' })
	@ApiConsumes('application/json')
	@ApiBody({
		type: InputUserModel
	})
	//   @ApiExtraModels(IInputRegistrationType)
	@ApiResponse({
		status: 204,
		description: 'Registration was sucsess',
	})
	@ApiBadRequestResponse({
		status: 400,
		description: 'Input data has incorrent value',
		schema: {
			$ref: getSchemaPath(ApiErrorMessage),
		},
	})
	@ApiExtraModels(ApiErrorMessage)
	@Post('/registration')
	@HttpCode(201)
	async registrationUser(@Body() inputModel: InputUserModel) {
		const {username, password, email} = inputModel
		const command = new RegistationCommand(username, password, email)
		const createUser = await this.commandBus.execute<RegistationCommand>(command)
		if(!createUser) throw new Error('error')
		return createUser
	}
}