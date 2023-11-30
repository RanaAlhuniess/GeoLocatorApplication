import {inject, injectable} from "inversify";
import {SearchRequestDto} from "../dtos/address/searchRequestDto";
import {IGeolocationService} from "./geoLocation/IGeolocationService";
import {AddressRepository} from "../repositories/address.repository";
import {AddressEntity} from "../entities/address.entity";
import {IMailerService} from "./mail/IMailer.service";
import {Logger} from "../config";

@injectable()
export class AddressService {
    constructor(@inject(IGeolocationService) private readonly geolocationService: IGeolocationService,
                @inject(IMailerService) private readonly mailerService: IMailerService,
                @inject(AddressRepository) private readonly addressRepository: AddressRepository
    ) {
    }

    async search(dto: SearchRequestDto): Promise<AddressEntity> {
        try {
            const address = await this.getByAddress(dto);
            if (dto.sendEmail) this.sendLocationEmail(dto.email, address);
            return {...address};
        } catch (e) {
            new Logger().error(`Error occurred while getting address ${e.message}`)
        }

    }

    private async getByAddress(dto: SearchRequestDto) {
        const existingAddress = await this.addressRepository.getByAddress(dto.address);
        if (existingAddress) {
            return existingAddress;
        }

        const result = await this.geolocationService.forwardGeocode(dto.address, 1);
        if (result?.length < 0) {
            return undefined;
        }

        const foundedAddress = result[0];
        const createdAddress = await this.addressRepository.create({
            address: dto.address,
            longitude: foundedAddress.longitude,
            latitude: foundedAddress.latitude,
        })
        return {...createdAddress};
    }

    private sendLocationEmail(receiverEmail: string, address: AddressEntity) {
        const body = this.getEmailHtmlContent(address);
        const subject = "Location Update - Your Current Location";
        this.mailerService.sendEmail(receiverEmail, subject, body)
            .then(() => {
            })
            .catch((err: any) => {
                new Logger().error(`Error occurred while sending email: ${err.message}`);
            });
    }

    private getEmailHtmlContent(address: AddressEntity) {
        const timestamp = new Date().toLocaleString();
        //TODO: refactoring this
        const htmlContent = `
            <p>Hello,</p>
            
            <p>I hope this message finds you well. Here is your latest location update:</p>
            
            <ul>
                <li><strong>Address:</strong> ${address.address}</li>
                <li><strong>Latitude:</strong> ${address.latitude}</li>
                <li><strong>Longitude:</strong> ${address.longitude}</li>
                
            </ul>
            
            <p>This information was captured at ${timestamp} using our location tracking service.</p>
            
            <p>If you have any questions or concerns, feel free to reach out.</p>
            
            <p>Best regards,<br>
            </p>
            `;

        return htmlContent;
    }
}