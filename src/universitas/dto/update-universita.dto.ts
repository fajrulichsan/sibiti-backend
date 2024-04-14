import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversitasDto } from './create-universitas.dto';

export class UpdateUniversitaDto extends PartialType(CreateUniversitasDto) {}
