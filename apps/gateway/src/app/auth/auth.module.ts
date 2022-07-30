import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Feishu } from '../feishu/entities/feishu.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, Feishu, PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
