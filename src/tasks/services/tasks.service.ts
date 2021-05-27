import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { FilterTaskDTO } from '../dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getAllTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    return this.taskRepository.search(filterTaskDTO);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createAndSave(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<void> {
    const existsTask = await this.getTaskById(id);
    if (!existsTask) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(existsTask);
  }

  async updateTaskStatusById(id: string, status: TaskStatus): Promise<Task> {
    const existsTask = await this.getTaskById(id);
    if (!existsTask) {
      throw new NotFoundException('Task not found');
    }
    existsTask.status = status;
    return this.taskRepository.save(existsTask);
  }
}
