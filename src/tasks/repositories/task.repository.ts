import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { FilterTaskDTO } from '../dtos/filter-task.dto';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../enum/task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createAndSave(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.BACKLOG,
    });

    await this.save(newTask);

    return newTask;
  }

  async search(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    const { search, status } = filterTaskDTO;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) ilike LOWER(:search) OR LOWER(task.description) ilike LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }
}
