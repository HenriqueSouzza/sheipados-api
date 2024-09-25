import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find({
      select: {
        name: true,
        username: true,
        email: true,
        firstLogin: true,
        isActive: true,
      }
    });
  }

  async findUser(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        name: true,
        username: true,
        email: true,
        firstLogin: true,
        isActive: true,
      }
    });
  }

  async create(body: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create({ ...body });
    const {
      name,
      username,
      email,
      firstLogin,
      isActive
    } = await this.userRepository.save(user);

    return {
      name,
      username,
      email,
      firstLogin,
      isActive,
    }
  }

  async update(username: string, body: Partial<User>): Promise<UserDto> {
    const user = this.userRepository.create(body);
    await this.userRepository.update({ username }, user);
    return this.findOne(username);
  }

  async remove(username: string): Promise<void> {
    await this.userRepository.delete({ username });
  }
}