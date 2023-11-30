import {inject, injectable} from "inversify";
import {SearchRequestDto} from "../dtos/address/searchRequestDto";
import {IGeolocationService} from "./geoLocation/IGeolocationService";
import {AddressRepository} from "../repositories/address.repository";
import {AddressEntity} from "../entities/address.entity";

@injectable()
export class AddressService {
    constructor(@inject(IGeolocationService) private readonly geolocationService: IGeolocationService, @inject(AddressRepository) private readonly addressRepository: AddressRepository,) {
    }

    async search(dto: SearchRequestDto): Promise<AddressEntity> {
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
}