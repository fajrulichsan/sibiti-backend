import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SubtestService } from './subtest.service';
import { CreateSubtestDto } from './dto/create-subtest.dto';
import { UpdateSubtestDto } from './dto/update-subtest.dto';
import { Subtest } from './entities/subtest.entity';

@Controller('subtest')
export class SubtestController {
  constructor(private readonly subtestService: SubtestService) {}

  @Post()
  async create(@Body() createSubtestDto: CreateSubtestDto){
    return this.subtestService.create(createSubtestDto);
  }

  @Get()
  async findAll(){
    return this.subtestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.subtestService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubtestDto: UpdateSubtestDto,
  ){
    const updateSubtest = await this.subtestService.update(+id, updateSubtestDto);
    if (updateSubtest.error == null || updateSubtest.status == 204) {
      throw new HttpException("Update subtest successfully", HttpStatus.OK)
    }
  }

  @Get('event/:id')
  async getAllByEventId(@Param('id') id: string){
    return this.subtestService.getAllByEventId(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    const deleteSubtest = await this.subtestService.remove(+id);
    if (deleteSubtest.error == null || deleteSubtest.status == 204) {
      throw new HttpException("Delete subtest successfully", HttpStatus.OK)
    }
  }
}
