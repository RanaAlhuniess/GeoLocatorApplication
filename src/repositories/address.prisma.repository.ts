import {inject, injectable} from "inversify";
import {PrismaClient} from "@prisma/client";
import {AddressEntity} from "../entities/address.entity";
import {AddressRepository} from "./address.repository";

@injectable()
export class PrismaAddressRepository implements AddressRepository {
    constructor(@inject(PrismaClient) private readonly prismaClient: PrismaClient) {
    }

    async create(address: AddressEntity): Promise<AddressEntity> {
        const dbResult = await this.prismaClient.address.create({
            data: {
                address: address.address,
                latitude: address.latitude,
                longitude: address.longitude
            }
        })
        return this.dbItemToEntity(dbResult);
    }

    async getByAddress(address: string): Promise<AddressEntity> {
        const dbResult = await this.prismaClient.address.findFirst({
            where: {
                address: address
            }
        });
        if (!dbResult) return undefined;
        return this.dbItemToEntity(dbResult)
    }

    private dbItemToEntity(item: any): AddressEntity | undefined {
        return {
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude
        } as AddressEntity;
    }
}