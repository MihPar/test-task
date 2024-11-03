import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaServiceAuth } from 'apps/src/auth/service/prisma.service';

@Injectable()
export class UserQueryRepository {
	constructor(
		protected readonly prismaServiceAuth: PrismaServiceAuth
	) {}

	async getUser(email: string, username: string): Promise<User | null | undefined> {
		try {
			await this.prismaServiceAuth.$transaction(async (prisma) => {
				if(email) {
					const user = await prisma.user.findUnique({
						where: {email}
					})
					if(!user) return null
					return user
				} else if(username) {
					const user = await prisma.user.findUnique({
						where: {username}
					})
					if(!user) return null
					return user
				}
			})
		} catch(error) {
			console.log('error', error)
			return null
		} finally{
			await this.prismaServiceAuth.$disconnect()
		}
	}

	async createUser(data: {
		auth: {
		  email: string,
		  username: string,
		  passwordHash: string,
		  passwordSalt: string,
		  isConfirm: boolean,
		}}
	): Promise<string | null | undefined> {
		const {
			auth: { email, isConfirm, username, passwordHash, passwordSalt }
		  } = data
	  
		  const createUserData = {
			email,
			username,
			passwordHash,
			passwordSalt,
			isConfirm,
		  }
		  try {
			await this.prismaServiceAuth.$transaction(async (prisma) => {
				const newUser = await prisma.user.create({ data: createUserData, })
				return newUser.id
			})
		  }catch(error) {
			console.log(error, 'error')
			return null
		} finally {
			await this.prismaServiceAuth.$disconnect()
		}
		  
	}
}