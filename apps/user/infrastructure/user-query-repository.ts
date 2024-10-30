import { Injectable } from '@nestjs/common'
import { User } from 'apps/auth/prisma/client'
import { PrismaServiceAuth } from 'apps/auth/src/services/auth.prisma.service'

@Injectable()
export class UsersRepositoryQuery {
  constructor(private prisma: PrismaServiceAuth) { }

  async checkUserExist(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } }).catch(() => null)
    return user ? true : false
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) return null
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return null
    return user
  }

  async getUsernameByUserId(arg: { userId: string }): Promise<{ username: string } | null> {
    const { userId } = arg
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true }
    })
    if (!user) return null
    return user
  }
}