import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { TaskStausValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './enum/task-status.enum';
import { TasksService } from './services/tasks.service';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterTaskDTO);
  }

  @Get('/:id')
  getTaskById(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body()
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id')
    id: string,
    @Body('status', TaskStausValidationPipe)
    status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
