import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoalService } from './soal.service';
import { CreateSoalDto } from './dto/create-soal.dto';
import { UpdateSoalDto } from './dto/update-soal.dto';

@Controller('soal')
export class SoalController {
  constructor(private readonly soalService: SoalService) {}

  @Post()
  create(@Body() createSoalDto: CreateSoalDto){
    return this.soalService.create(createSoalDto);
  }

  @Get(':eventId/:subtestId')
  findAll(@Param('eventId') eventId: number, @Param('subtestId') subtestId: number){
    return this.soalService.findAll(eventId, subtestId);
  }

  @Get(':eventId/:subtestId/:no')
  findOne(@Param('eventId') eventId: number, @Param('subtestId') subtestId: number,  @Param('no') no){
    return this.soalService.findOne(eventId, subtestId, no);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoalDto: UpdateSoalDto){
    return this.soalService.update(+id, updateSoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.soalService.remove(+id);
  }
}
