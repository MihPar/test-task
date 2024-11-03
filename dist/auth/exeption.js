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
exports.ApiErrorMessage = exports.ApiError = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiError {
}
exports.ApiError = ApiError;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "message for field",
        nullable: true,
        example: "Error message"
    }),
    __metadata("design:type", String)
], ApiError.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'input model has error',
        nullable: true,
        example: 'input value has error'
    }),
    __metadata("design:type", String)
], ApiError.prototype, "field", void 0);
class ApiErrorMessage {
}
exports.ApiErrorMessage = ApiErrorMessage;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of message',
        type: [ApiError],
        nullable: true
    }),
    __metadata("design:type", Array)
], ApiErrorMessage.prototype, "errorsMessages", void 0);
//# sourceMappingURL=exeption.js.map