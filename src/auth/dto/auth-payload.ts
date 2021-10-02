import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth DTO' })
export class AuthDto {
  @Field()
  token: string;
}