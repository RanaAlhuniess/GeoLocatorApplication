import {injectable} from "inversify";
import node_geocoder from "node-geocoder";
import {IGeolocationService} from "./IGeolocationService";
import {GeocodeResponseItem} from "./GeocodeResponseItem";

@injectable()
export class MapboxGeoLocationService implements IGeolocationService {

    private readonly geocoder: node_geocoder.Geocoder;

    constructor() {
        this.geocoder = node_geocoder({
            provider: 'mapbox',
            apiKey: process.env.MAPBOX_KEY,
            formatter: null
        });
    }

    async forwardGeocode(address: string, limit: number): Promise<GeocodeResponseItem[]> {
        const result = await this.geocoder.geocode({
            limit: limit,
            address: address
        })
        return result.map(value => {
            return {
                latitude: value.latitude,
                longitude: value.longitude,
                payload: value
            } as GeocodeResponseItem;
        });
    }

}