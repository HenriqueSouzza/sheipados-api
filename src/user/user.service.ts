import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
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
      }
    });
  }

  findUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        name: true,
        username: true,
        email: true,
        firstLogin: true,
      }
    });
  }

  create(body: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create({ ...body, firstLogin: true });
    return this.userRepository.save(user);
  }

  async update(username: string, user: Partial<User>): Promise<UserDto> {
    const property = await this.userRepository.findOne({
      where: { username }
    });

    return await this.userRepository.save({
      ...property,
      ...user
    });
  }

  async remove(username: string): Promise<void> {
    await this.userRepository.delete(username);
  }
}