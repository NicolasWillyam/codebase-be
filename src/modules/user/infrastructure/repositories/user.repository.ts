import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async updatePassword(userId: string, newHashedPassword: string) {
    return this.repo.update({ id: userId }, { password: newHashedPassword });
  }
}
