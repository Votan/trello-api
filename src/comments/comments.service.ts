import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Comments } from './comment.entity';
import { UpdateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async create(entity: DeepPartial<Comments>) {
    return await this.commentsRepository.save(entity);
  }

  findAll(): Promise<Comments[]> {
    return this.commentsRepository.find();
  }

  findOne(id: string): Promise<Comments> {
    return this.commentsRepository.findOne(id);
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(id, updateCommentDto);
  }

  async delete(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
