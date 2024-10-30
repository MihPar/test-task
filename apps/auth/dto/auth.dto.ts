import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../prisma/client";


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

export class IUserInputModel {
	@IsOptional()
	@IsString()
	@MinLength(3, { message: 'Login must be at least 3 characters long' })
	@MaxLength(10, { message: 'Login must be at most 10 characters long' })
	@Matches(/^[a-zA-Z0-9_-]*$/, { message: 'Login can only contain letters, numbers, underscores, and dashes' })
	username: string;

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@MaxLength(20, { message: 'Password must be at most 20 characters long' })
	password: string;

	@IsOptional()
	@IsEmail({}, { message: 'Invalid email address' })
	@Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email format is invalid' })
	email: string;
}

export type IUserViewModel = Pick<User, "id" | "username" | "email" | "createdAt">
