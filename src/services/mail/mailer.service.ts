import {injectable} from "inversify";
import {IMailerService} from "./IMailer.service";
import {createTransport, SendMailOptions, Transporter} from "nodemailer";
import {Logger} from "../../config";

@injectable()
export class MailerService implements IMailerService {
    private readonly senderEmailAddress: string;
    private readonly senderEmailPassword: string;
    private transporter: Transporter;

    constructor() {
        this.senderEmailAddress = process.env.EMAIL_USER || '';
        this.senderEmailPassword = process.env.EMAIL_PASSWORD || '';
        this.transporter = createTransport({
            service: 'hotmail',
            auth: {
                user: this.senderEmailAddress,
                pass: this.senderEmailPassword,
            },
        });
    }

    async sendEmail(receiverEmail: string, subject: string, body: string): Promise<any> {
        try {
            const mailOptions: SendMailOptions = {
                from: this.senderEmailAddress,
                to: receiverEmail,
                subject: subject,
                text: '',
                html: body,
            };

            const info = await this.transporter.sendMail(mailOptions);
            new Logger().info(`Message sent: ${info.messageId}`);
            return info;
        } catch (error) {
            new Logger().error(`Error occurred while sending email: ${error.message}`);
            throw new Error('Failed to send email');
        }
    }
}