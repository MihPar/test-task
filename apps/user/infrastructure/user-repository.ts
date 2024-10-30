import { Injectable } from "@nestjs/common"
import { UsersRepositoryQuery } from "./user-query-repository"
import { PrismaServiceAuth } from "apps/auth/auth-prisma-service"
import { Prisma, } from "@prisma/client"

@Injectable()
export class UsersRepository {
  constructor(
    private prisma: PrismaServiceAuth,
  ) { }
async createUser(data: {
    auth: {
      email: string,
      username: string,
      passwordHash: string,
      passwordSalt: string,
      isConfirm: boolean,
    }
  }): Promise<string> {
    const {
      auth: { email, isConfirm, username, passwordHash, passwordSalt, },
    } = data

    const createUserData: Prisma.UserCreateArgs["data"] = {
      email,
      username,
      passwordHash,
      passwordSalt,
      isConfirm,
    }

    const newUser = await this.prisma.user.create({ data: createUserData, })
    return newUser.id
  }
}