import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-payload';
import { LoginUserInput, RegisterUserInput } from './dto/register-user.input';
const SALT_ROUNDS = 10

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation((returns) => AuthDto)
  async register(@Args('registerData') registerData: RegisterUserInput): Promise<AuthDto> {
    const user = await this.usersService.findByEmail(registerData.email);
    if (user) {
      throw new Error('User already exists!');
    }
    
    const hashedPassword = await bcrypt.hash(registerData.password,SALT_ROUNDS,);
    registerData.password = undefined;
    return await this.authService.registerUser(registerData.email, hashedPassword);
  }

  @Mutation((returns) => AuthDto)
  async login(
    @Args('loginData') loginData: LoginUserInput
  ): Promise<AuthDto> {
    return await this.authService.login(loginData.email, loginData.password);
  }
}
