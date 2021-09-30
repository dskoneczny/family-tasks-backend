import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { NewTaskInput } from './dto/new-task.input';
import { Task } from './models/task.model';
import { TasksService } from './tasks.service';


@Resolver(of => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(returns => [Task])
  tasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Mutation(returns => Task)
  async addTask(
    @Args('newTaskData') newTaskData: NewTaskInput,
  ): Promise<Task> {
    return this.tasksService.create(newTaskData);
  }

  @Mutation(returns => Task)
  async markTaskAsDone(@Args('id') id: string) {
    return this.tasksService.update(id, {
      done: true
    })
  }
}