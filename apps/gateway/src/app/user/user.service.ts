import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { UserInfoFeishu } from '../feishu/dto/user-token-feishu.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  createOrSave(user) {
    return this.usersRepository.save(user);
  }

  createOrSaveByFeishu(user: UserInfoFeishu) {
    return from(this.usersRepository.findBy({ email: user.email })).pipe(
      switchMap((userEntity) =>
        from(this.usersRepository.save({ ...userEntity, ...user }))
      )
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
