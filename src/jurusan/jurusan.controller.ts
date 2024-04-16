import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { UpdateJurusanDto } from './dto/update-jurusan.dto';

@Controller('jurusan')
export class JurusanController {
  constructor(private readonly jurusanService: JurusanService) {}

  @Post()
  create(@Body() createJurusanDto: CreateJurusanDto) {
    return this.jurusanService.create(createJurusanDto);
  }

  @Get(':code')
  findByCodeUniv(@Param('code') code: number) {
    return this.jurusanService.findByCodeUniv(+code);
  }

}
