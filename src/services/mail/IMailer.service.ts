import {AddressEntity} from "../../entities/address.entity";

export abstract class IMailerService {
    abstract sendEmail(receiverEmail: string, subject: string, body: string): Promise<any>;
}