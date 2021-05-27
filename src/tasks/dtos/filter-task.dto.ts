import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class FilterTaskDTO {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
