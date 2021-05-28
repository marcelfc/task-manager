import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { IPayloadJwt } from '../interfaces/payload-jwt.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'sdfhsdfjkhsdkjhfksdhf',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IPayloadJwt): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
