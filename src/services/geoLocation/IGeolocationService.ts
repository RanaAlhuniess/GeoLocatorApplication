import {GeocodeResponseItem} from "./GeocodeResponseItem";

export abstract class IGeolocationService {
    abstract forwardGeocode(address: string, limit: number) : Promise<GeocodeResponseItem[]>;
}