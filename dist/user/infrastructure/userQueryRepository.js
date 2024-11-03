"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../auth/service/prisma.service");
let UserQueryRepository = class UserQueryRepository {
    constructor(prismaServiceAuth) {
        this.prismaServiceAuth = prismaServiceAuth;
    }
    async getUser(email, username) {
        try {
            await this.prismaServiceAuth.$transaction(async (prisma) => {
                if (email) {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });
                    if (!user)
                        return null;
                    return user;
                }
                else if (username) {
                    const user = await prisma.user.findUnique({
                        where: { username }
                    });
                    if (!user)
                        return null;
                    return user;
                }
            });
        }
        catch (error) {
            console.log('error', error);
            return null;
        }
        finally {
            await this.prismaServiceAuth.$disconnect();
        }
    }
    async createUser(data) {
        const { auth: { email, isConfirm, username, passwordHash, passwordSalt } } = data;
        const createUserData = {
            email,
            username,
            passwordHash,
            passwordSalt,
            isConfirm,
        };
        try {
            await this.prismaServiceAuth.$transaction(async (prisma) => {
                const newUser = await prisma.user.create({ data: createUserData, });
                return newUser.id;
            });
        }
        catch (error) {
            console.log(error, 'error');
            return null;
        }
        finally {
            await this.prismaServiceAuth.$disconnect();
        }
    }
};
exports.UserQueryRepository = UserQueryRepository;
exports.UserQueryRepository = UserQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaServiceAuth])
], UserQueryRepository);
//# sourceMappingURL=userQueryRepository.js.map