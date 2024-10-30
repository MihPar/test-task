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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
const createUser_use_case_1 = require("./use-case/createUser.use-case");
let AuthController = class AuthController {
    constructor(ucCreateUser) {
        this.ucCreateUser = ucCreateUser;
    }
    async registration(body) {
        const { email, username, password } = body;
        const user = await this.ucCreateUser.execute({ email, username, password });
        if (user.status === 'success')
            return user.payload;
        if (user.status === 'error')
            throw new common_1.BadRequestException(user.errorType);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.IInputRegistrationType]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [createUser_use_case_1.CreateUser])
], AuthController);
//# sourceMappingURL=auth.contorller.js.map