import { HomestayEntity } from "../../domain/homestay.entity";

export class HomestayListItemDto{
    id:string;
    name:string;
    pricePerNight:number;
    location: string;
    thumbnail: string;

    static fromEntity(entity:HomestayEntity):HomestayListItemDto{
        return {
            id:entity.id,
            name: entity.name,
            pricePerNight :entity.pricePerNight,
            location :entity.location,
            thumbnail :entity.images?.[0] || '',
        };
    }
}
