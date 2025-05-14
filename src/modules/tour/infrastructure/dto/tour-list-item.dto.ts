//Đây là DTO (Data Transfer Object) dùng để định nghĩa dữ liệu trả về khi gọi API danh sách tour.
export class TourListItemDto {
  id: string;
  name: string;
  thumbnail: string;
  shortDescription: string;
  price: number;
}
