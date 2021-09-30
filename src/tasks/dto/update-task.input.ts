import { InputType, PartialType } from '@nestjs/graphql';
import { NewTaskInput } from './new-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(NewTaskInput) {}
