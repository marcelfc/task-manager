import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enum/task-status.enum';
export class TaskStausValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value.toUpperCase();
    if (!(value in TaskStatus)) {
      throw new BadRequestException(`Status "${value}" is not valid`);
    }
    return value;
  }
}
