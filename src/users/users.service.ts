import {
  BadRequestException,
  // HttpException,
  // HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  getAllUsers() {
    return `This action returns all 312333`;
  }

  async getUserById(id: number) {
    const currentUser = await this.usersRepository.findOneBy({ id });
    if (currentUser) {
      return currentUser;
    }
    throw new BadRequestException('Bad Request!');
  }

  async getUserByEmail(email: string) {
    const currentUser = await this.usersRepository.findOneBy({ email });
    if (currentUser) {
      return currentUser;
    }
    throw new BadRequestException('Bad Request');
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
