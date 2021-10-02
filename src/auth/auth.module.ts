import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_KEY
    }),
  ],
})
export class AuthModule {}
