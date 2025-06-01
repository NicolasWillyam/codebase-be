import { HomestayEntity } from "../../domain/homestay.entity";

export class HomestayAdminListItemDto{
    id:string;
    name:string;
    pricePerNight:number;
    location:string;
    description:string;
    images: string[];
    amenities: string[];
    createdAt :Date;

    static fromEntity(entity: HomestayEntity):HomestayAdminListItemDto{
        return{
            id: entity.id,
            name :entity.name,
            pricePerNight :entity.pricePerNight,
            location :entity.location,
            description :entity.description,
            images :entity.images,
            amenities :entity.amenities,
            createdAt :entity.createdAt,
        };
    }
}