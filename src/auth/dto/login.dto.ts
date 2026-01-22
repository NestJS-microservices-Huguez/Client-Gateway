import { IsEmail, IsString, Length, MIN } from "class-validator";

export class LoginDTO {

   @IsString()
   @IsEmail()
   public email: string;

   @IsString()
   @Length(3)
   public password: string;
}