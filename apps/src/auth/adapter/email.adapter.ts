import { Injectable } from '@nestjs/common';
import { log } from 'console';
import nodemailer from "nodemailer"


@Injectable()
export class EmailAdapter {
	  async sendEmailByRecoveryCode(email: string, code: string) {
		const transporter = nodemailer.createTransport({
		  service: "gmail",
		  auth: {
			user: "m7274@gmail.com",
			pass: "ldhkcdcybmrbxaew",
		  },
		});
		async function main() {
		  const info = await transporter.sendMail({
			from: "Mihail <m7274@gmail.com>", // sender address
			to: email, // list of receivers
			subject: "Hello worlds", // Subject line
			html: `<h1>Password recovery</h1>
				  <p>To finish password recovery please follow the link below:
				  <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
				  </p>`,
		  });
		}
		main().catch(console.error);
	  }
}