import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CredentialsAuthDTO } from './dto/credentials-auth.dto';
import { IResponseSigninToken } from './interfaces/response-singin-token';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  @UsePipes(ValidationPipe)
  singup(
    @Body()
    credentialsAuthDTO: CredentialsAuthDTO,
  ): Promise<void> {
    return this.authService.singup(credentialsAuthDTO);
  }

  @Post('/singin')
  singin(
    @Body()
    credentialsAuthDTO: CredentialsAuthDTO,
  ): Promise<IResponseSigninToken> {
    return this.authService.singin(credentialsAuthDTO);
  }
}
