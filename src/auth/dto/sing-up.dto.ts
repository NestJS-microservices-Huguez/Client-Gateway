import { IsString, Length } from "class-validator";
import { LoginDTO } from "./login.dto";

export class SignUpDTO extends LoginDTO {
   @IsString()
   @Length(3)
   public username: string;
}