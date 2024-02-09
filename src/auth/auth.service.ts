import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
// import bcrypt from 'bcrypt';
import { RegistrationAuthDto } from './dto/registration-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/tokenPayload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createAuthDto: RegistrationAuthDto) {
    const { email, password: unhashedPassword } = createAuthDto;
    const hashedPassword = await argon2.hash(unhashedPassword);
    try {
      const createdUser = await this.usersService.createUser({
        email,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      console.log(1);
      const currentUser = await this.usersService.getUserByEmail(email);
      console.log(2);

      const result = await this.verifyPassword(password, currentUser.password);
      console.log(3, result);

      currentUser.password = undefined;
      console.log(4);

      return currentUser;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  async verifyPassword(hashedPassword: string, password: string) {
    console.log(11);
    console.log(hashedPassword, password);
    try {
      const isPasswordMatching = await argon2.verify(hashedPassword, password);
      console.log(isPasswordMatching);

      if (!isPasswordMatching) {
        throw new BadRequestException('Something went wrong!');
      }
      return isPasswordMatching;
    } catch (error) {
      throw new BadRequestException('Failed');
    }
  }

  async getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
