import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsAuthDTO } from '../dto/credentials-auth.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IResponseSigninToken } from '../interfaces/response-singin-token';
import { IPayloadJwt } from '../interfaces/payload-jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singup(credentialsAuthDTO: CredentialsAuthDTO): Promise<void> {
    const { username, password } = credentialsAuthDTO;
    const existsUser = await this.userRepository.findUserByUsername(username);

    if (existsUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository.createAndSave({
      username,
      password: hashedPassword,
    });
  }

  async singin(
    credentialsAuthDTO: CredentialsAuthDTO,
  ): Promise<IResponseSigninToken> {
    const { username, password } = credentialsAuthDTO;
    const existsUser = await this.userRepository.findUserByUsername(username);

    if (existsUser && (await bcrypt.compare(password, existsUser.password))) {
      const payload: IPayloadJwt = { username };
      const acess_token = await this.jwtService.sign(payload);
      return { acess_token };
    } else {
      throw new UnauthorizedException('Please, check your credentials');
    }
  }
}
