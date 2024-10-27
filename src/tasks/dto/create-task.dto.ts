import { MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @MinLength(5)
  @MaxLength(20)
  title: string;

  description: string;
  status: 'pendente' | 'concluída';
  dueDate: Date;
}
