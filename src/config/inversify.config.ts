import {Container} from "inversify";
import {AddressService} from "../services/address.service";
import {MapboxGeoLocationService} from "../services/geoLocation/mapboxGeoLocation.service";
import {IGeolocationService} from "../services/geoLocation/IGeolocationService";

export const container = new Container();
container.bind(IGeolocationService).to(MapboxGeoLocationService);
container.bind(AddressService).toSelf();