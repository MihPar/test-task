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
exports.CreateUser = void 0;
const common_1 = require("@nestjs/common");
const auth_repositoryQuery_1 = require("../infrastructura/auth.repositoryQuery");
const bcrypt_1 = require("bcrypt");
let CreateUser = class CreateUser {
    constructor(queryRepository) {
        this.queryRepository = queryRepository;
    }
    async execute(command) {
        const { email, username, password } = command;
        const exist = await this.queryRepository.checkExistUser({ email, username });
        if (exist.email === 'exist')
            return { status: 'error', errorType: 'existed_email' };
        if (exist.username === 'exist')
            return { status: 'error', errorType: 'existed_login' };
        const passwordSalt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await this.authServiceForUseCase.GenerateHashPassword(password, passwordSalt);
        const newCode = uuidv4();
        const expirationDate = add(new Date(), {
            minutes: this.keys.keys.codeConfirmRegisterMinutes,
        }).toISOString();
        const res = await this.emailManager.sendEmail(email, newCode, 'Registration').catch(e => {
            console.log('Error EmailManager.SendEmail', e);
            return null;
        });
        if (res === null)
            return { status: 'error', errorType: 'error_send_email' };
        const newUserId = await this.userRepositories.createUser({
            auth: {
                email,
                username,
                passwordHash,
                passwordSalt,
                isConfirm: false
            },
        });
        interceptForTest.userId(newUserId);
        await this.codeConfirmationRepositories.updateOrCreateCode(newUserId, newCode, expirationDate, "register");
        const user = await this.userRepositoryQuery.getUserById(newUserId);
        return { status: 'success', payload: user };
    }
};
exports.CreateUser = CreateUser;
exports.CreateUser = CreateUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repositoryQuery_1.QueryRepository])
], CreateUser);
//# sourceMappingURL=createUser.use-case.js.map