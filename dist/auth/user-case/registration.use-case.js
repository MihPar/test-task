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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistationUseCase = exports.RegistationCommand = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("@nestjs/common");
const userQueryRepository_1 = require("../../user/infrastructure/userQueryRepository");
const cqrs_1 = require("@nestjs/cqrs");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const email_adapter_1 = require("../adapter/email.adapter");
const codeConfirmationRepository_1 = require("../../user/infrastructure/codeConfirmationRepository");
class RegistationCommand {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
exports.RegistationCommand = RegistationCommand;
let RegistationUseCase = class RegistationUseCase {
    constructor(userQueryRepository, emailAdapter, codeConfiramtionRepository) {
        this.userQueryRepository = userQueryRepository;
        this.emailAdapter = emailAdapter;
        this.codeConfiramtionRepository = codeConfiramtionRepository;
    }
    async execute(command) {
        const { username, password, email } = command;
        const findUser = await this.userQueryRepository.getUser(email, username);
        if (!findUser)
            throw new common_1.NotFoundException('404');
        const passwordSalt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(password, passwordSalt);
        const newCode = (0, uuid_1.v4)();
        const expirationDate = (0, date_fns_1.add)(new Date(), {
            minutes: 20,
        }).toISOString();
        const res = await this.emailAdapter.sendEmailByRecoveryCode(email, newCode).catch(e => {
            console.log('Error EmailManager.SendEmail', e);
            return null;
        });
        const newUserId = await this.userQueryRepository.createUser({
            auth: {
                email,
                username,
                passwordHash,
                passwordSalt,
                isConfirm: false
            },
        });
        await this.codeConfiramtionRepository.updateOrCreateCode(newUserId, newCode, expirationDate, "register");
    }
};
exports.RegistationUseCase = RegistationUseCase;
exports.RegistationUseCase = RegistationUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(RegistationCommand),
    __metadata("design:paramtypes", [userQueryRepository_1.UserQueryRepository,
        email_adapter_1.EmailAdapter,
        codeConfirmationRepository_1.CodeConfiramtionRepository])
], RegistationUseCase);
//# sourceMappingURL=registration.use-case.js.map