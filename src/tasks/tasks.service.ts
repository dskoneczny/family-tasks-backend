import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { NewTaskInput } from './dto/new-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: MongoRepository<Task>,
  ) {}

  async create(data: NewTaskInput): Promise<Task> {
    return this.tasksRepository.save(data);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async update(id: string, newData: UpdateTaskInput): Promise<Task> {
    let oldData = await this.tasksRepository.findOne(id);

    return this.tasksRepository.save({
      id: id,
      ...oldData,
      ...newData,
    });
  }
}
