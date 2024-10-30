import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { IsOptional, MaxLength, MinLength } from "class-validator";

export class IInputRegistrationType {
	@ApiProperty({
		type: String,
		minLength: 3,
		maxLength: 10,
		example: "John"
	})
	@IsNotEmpty()
	@IsString()
	@Length(3, 10)
	@Matches(/^[a-zA-Z0-9_-]*$/, { message: 'Login can only contain letters, numbers, underscores, and dashes' })
	username: string;

	@ApiProperty({
		type: String,
		minLength: 6,
		maxLength: 20,
		pattern:
			'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\\"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~])',
		example: 'String1234@+'
	})
	@IsNotEmpty()
	@IsString()
	@Length(6, 20)
	@Matches(
		/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/g,
		{
			message: 'password is uncorrect',
		})
	password: string;

	@ApiProperty({
		type: String,
		format: 'email',
		example: 'xxx@yandex.ru'
	})
	@IsNotEmpty()
	@IsEmail()
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email format is invalid' })
	email: string;
}