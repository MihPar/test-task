"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAdapter = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
let EmailAdapter = class EmailAdapter {
    async sendEmailByRecoveryCode(email, code) {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "m7274@gmail.com",
                pass: "ldhkcdcybmrbxaew",
            },
        });
        async function main() {
            const info = await transporter.sendMail({
                from: "Mihail <m7274@gmail.com>",
                to: email,
                subject: "Hello worlds",
                html: `<h1>Password recovery</h1>
				  <p>To finish password recovery please follow the link below:
				  <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
				  </p>`,
            });
        }
        main().catch(console.error);
    }
};
exports.EmailAdapter = EmailAdapter;
exports.EmailAdapter = EmailAdapter = __decorate([
    (0, common_1.Injectable)()
], EmailAdapter);
//# sourceMappingURL=email.adapter.js.map