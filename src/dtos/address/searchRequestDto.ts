import {IsBoolean, IsEmail, IsNotEmpty, IsString,} from 'class-validator';

export class SearchRequestDto {
    @IsString()
    @IsNotEmpty()
    address: string = '';

    @IsEmail()
    @IsNotEmpty()
    email: string = '';

    @IsBoolean()
    sendEmail: boolean = false;
}