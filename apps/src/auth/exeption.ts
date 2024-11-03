import { ApiProperty } from "@nestjs/swagger"

export class ApiError {
	@ApiProperty({
		type: String,
		description: "message for field",
		nullable: true,
		example: "Error message"
	})
	message: string

	@ApiProperty({
		type: String,
		description: 'input model has error',
		nullable: true,
		example: 'input value has error'
	})
	field: string
}

export class ApiErrorMessage {
	@ApiProperty({
		description: 'Array of message',
		type: [ApiError],
		nullable: true
	})
	errorsMessages: ApiError[]
}