import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCardDto, UpdateCardDto } from './cards.dto';
import { CardsService } from './cards.service';
import { CurrentUser } from '../guards/current-user.decorator';
import { User } from '../users/user.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createUserDto: CreateCardDto, @CurrentUser() user: User) {
    return this.cardsService.create(createUserDto, user);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.delete(id);
  }
}
