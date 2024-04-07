import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createEventDto: CreateEventDto) {
    const newEvent = new Event(); 
    newEvent.name = createEventDto.name;
    newEvent.publish = createEventDto.publish;
    newEvent.dueDate = createEventDto.dueDate;
    newEvent.subtest = createEventDto.subtest;
    newEvent.harga = createEventDto.harga;
    newEvent.status = createEventDto.status;
   
    const createEvent = await this.eventService.create(newEvent);
    
    if(createEvent.error == null || createEvent.status == 201){
      throw new HttpException('Created event successflly',HttpStatus.CREATED )
    }else{
      throw new HttpException('Created event failed',HttpStatus.BAD_REQUEST )
    }
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() event: Event) {
    const updateEvent = await this.eventService.update(id, event);

    if(updateEvent.error == null || updateEvent.status == 204){
      throw new HttpException('Updated event successflly',HttpStatus.OK )
    }else{
      throw new HttpException('Updated event failed',HttpStatus.BAD_REQUEST )
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}
