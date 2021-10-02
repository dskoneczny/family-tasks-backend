import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType({ description: 'task' })
@Entity()
export class Task {
  @Field((type) => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field()
  @Column()
  creationDate: Date;

  @Field()
  @Column()
  done: boolean;
}
