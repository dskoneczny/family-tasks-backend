import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsEmail({})
  @Field()
  email: string;

  @Length(5, 20)
  @Field()
  password: string;
}

@InputType()
export class LoginUserInput extends RegisterUserInput {}

