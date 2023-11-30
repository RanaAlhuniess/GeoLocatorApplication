import {AddressEntity} from "../entities/address.entity";

export abstract class AddressRepository {
    abstract create(item: AddressEntity): Promise<AddressEntity>;

    abstract getByAddress(address: string): Promise<AddressEntity>;
}