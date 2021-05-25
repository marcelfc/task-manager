import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const existsTask = this.tasks.find((task) => task.id === id);
    if (!existsTask) {
      throw new NotFoundException('Task not fount');
    }

    return existsTask;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const newTask: Task = {
      title,
      description,
      status: TaskStatus.BACKLOG,
      id: uuid(),
    };

    this.tasks.push(newTask);

    return newTask;
  }

  deleteTaskById(id: string): void {
    const existsTask = this.getTaskById(id);
    const indexDeleted = this.tasks.findIndex(
      (task) => task.id === existsTask.id,
    );
    this.tasks.splice(indexDeleted, 1);
  }

  updateTaskStatusById(id: string, status: TaskStatus): void {
    const existsTask = this.getTaskById(id);
    this.tasks.map((task) => {
      if (task.id === existsTask.id) {
        task.status = status;
      }

      return task;
    });
  }
}
