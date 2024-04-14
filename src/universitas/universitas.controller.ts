import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUniversitasDto } from './dto/create-universitas.dto';
import { UniversitasService } from './universitas.service';

@Controller('universitas')
export class UniversitasController {
  constructor(private readonly universitasService: UniversitasService) {}

  @Get()
  findAll() {
    return this.universitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universitasService.findOne(+id);
  }

  @Post()
  create(@Body() createUniversitasDto: CreateUniversitasDto) {
    return this.universitasService.create(createUniversitasDto);
  }
}
