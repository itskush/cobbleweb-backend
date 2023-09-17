declare class PhotoDto {
    name: string;
    url: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    photos: PhotoDto[];
}
export {};
