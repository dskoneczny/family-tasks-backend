import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Length, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewTaskInput {
  @Field()
  @Length(5, 30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  description?: string;

  @Field({nullable: false, defaultValue: false})
  @IsBoolean()
  done: boolean;
}

@InputType()
export class UpdateTaskInput extends PartialType(NewTaskInput) {}

