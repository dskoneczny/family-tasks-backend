import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: "localhost",
      port: 27017,
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})

export class AppModule {}
