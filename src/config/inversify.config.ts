import {Container} from "inversify";
import {AddressService} from "../services/address.service";
import {MapboxGeoLocationService} from "../services/geoLocation/mapboxGeoLocation.service";
import {IGeolocationService} from "../services/geoLocation/IGeolocationService";
import {PrismaAddressRepository} from "../repositories/address.prisma.repository";
import {AddressRepository} from "../repositories/address.repository";
import {PrismaClient} from "@prisma/client";

export const container = new Container();
container.bind(IGeolocationService).to(MapboxGeoLocationService);
container.bind(PrismaClient).toConstantValue(new PrismaClient());
container.bind(AddressRepository).to(PrismaAddressRepository);
container.bind(AddressService).toSelf();