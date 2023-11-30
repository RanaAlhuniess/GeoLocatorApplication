import {inject, injectable} from "inversify";
import {SearchRequestDto} from "../dtos/address/searchRequestDto";
import {IGeolocationService} from "./geoLocation/IGeolocationService";

@injectable()
export class AddressService {
    constructor(
        @inject(IGeolocationService) private readonly mapboxGeoLocationService: IGeolocationService,
    ) {}
    async search(dto: SearchRequestDto) {
        const result = await this.mapboxGeoLocationService.forwardGeocode(dto.address, 1);
        return result;
    }
}