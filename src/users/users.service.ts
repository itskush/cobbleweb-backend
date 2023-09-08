import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Client } from './entities/client.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Client)
    private repo: Repository<Client>,
  ) {}

  /**
   * Creates a new user by saving the provided user data to the database.
   * @param userDto - The user data to create.
   * @returns A success message if the user is created successfully.
   */
  async create(userDto: CreateUserDto): Promise<string> {
    const user = this.repo.create(userDto);
    const createdUser = await this.repo.save(user);

    if (createdUser) {
      return 'User created successfully';
    }

    return 'User was not created successfully';
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns The user object if found.
   */
  async findOneById(id: number): Promise<Client> {
    return this.repo.findOneBy({id});
  }

  /**
   * Finds users by their email.
   * @param email - The email to search for.
   * @returns An array of users with matching email.
   */
  async findUsersByEmail(email: string): Promise<Client[]> {
    return this.repo.find({ where: { email } });
  }

  /**
   * Updates a user's attributes by their ID.
   * @param id - The ID of the user to update.
   * @param attrs - The attributes to update.
   * @returns The updated user object.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, attrs: Partial<User>): Promise<Client> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**
   * Removes a user from the database by their ID.
   * @param id - The ID of the user to remove.
   * @returns A success message if the user is removed successfully.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: number): Promise<string> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(user);
    return 'User removed successfully';
  }
}