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
exports.IUserInputModel = exports.IInputRegistrationType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class IInputRegistrationType {
}
exports.IInputRegistrationType = IInputRegistrationType;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        minLength: 3,
        maxLength: 10,
        example: "John"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 10),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/, { message: 'Login can only contain letters, numbers, underscores, and dashes' }),
    __metadata("design:type", String)
], IInputRegistrationType.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\\"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~])',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 20),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/g, {
        message: 'password is uncorrect',
    }),
    __metadata("design:type", String)
], IInputRegistrationType.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'email',
        example: 'xxx@yandex.ru'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email format is invalid' }),
    __metadata("design:type", String)
], IInputRegistrationType.prototype, "email", void 0);
class IUserInputModel {
}
exports.IUserInputModel = IUserInputModel;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Login must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(10, { message: 'Login must be at most 10 characters long' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/, { message: 'Login can only contain letters, numbers, underscores, and dashes' }),
    __metadata("design:type", String)
], IUserInputModel.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Password must be at most 20 characters long' }),
    __metadata("design:type", String)
], IUserInputModel.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    (0, class_validator_1.Matches)(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email format is invalid' }),
    __metadata("design:type", String)
], IUserInputModel.prototype, "email", void 0);
//# sourceMappingURL=auth.dto.js.map