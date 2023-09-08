import  { IsEmail, IsString, Length, Matches, IsBoolean, ValidateIf, IsArray, ArrayMinSize, IsNotEmpty} from 'class-validator'

class PhotoDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
}


export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    @Matches(/(?=.*[0-9])/, {
        message: 'password must contain at least one number', 
      })
    password: string;
    
    @IsNotEmpty()
    @Length(2, 25)
    firstName: string;

    @IsNotEmpty()
    @Length(2, 25)
    lastName: string;

    @ValidateIf(o => o.photos !== undefined)
    @IsArray()
    @ArrayMinSize(4)
    photos: PhotoDto[];

}