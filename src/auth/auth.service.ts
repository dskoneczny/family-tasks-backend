import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwtToken(data: string): string {
    return this.jwtService.sign({ id: data }, { expiresIn: '1d' });
  }

  async registerUser(email: string, password: string): Promise<AuthDto> {
    const user = await this.usersService.create(email, password);
    const token = this.generateJwtToken(user.id);
    return { token };
  }

  async login(email: string, password: string): Promise<AuthDto> {
    const user = await this.usersService.findByEmail(email);
    let passwordComparisonResult: boolean;
    if (user) {
      passwordComparisonResult = await bcrypt.compare(password, user.password);
    }
    if (!user || !passwordComparisonResult) {
      throw new Error('Invalid login or password');
    }
      const token = this.generateJwtToken(user.id);
      return { token };
    
  }
}