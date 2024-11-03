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
const inputUserMode_1 = require("./dto/inputUserMode");
const swagger_1 = require("@nestjs/swagger");
const exeption_1 = require("./exeption");
const cqrs_1 = require("@nestjs/cqrs");
const registration_use_case_1 = require("./user-case/registration.use-case");
let AuthController = class AuthController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async registrationUser(inputModel) {
        const { username, password, email } = inputModel;
        const command = new registration_use_case_1.RegistationCommand(username, password, email);
        const createUser = await this.commandBus.execute(command);
        if (!createUser)
            throw new Error('error');
        return createUser;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'registration user' }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiBody)({
        type: inputUserMode_1.InputUserModel
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Registration was sucsess',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Input data has incorrent value',
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(exeption_1.ApiErrorMessage),
        },
    }),
    (0, swagger_1.ApiExtraModels)(exeption_1.ApiErrorMessage),
    (0, common_1.Post)('/registration'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputUserMode_1.InputUserModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrationUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], AuthController);
//# sourceMappingURL=auth.controller.js.map