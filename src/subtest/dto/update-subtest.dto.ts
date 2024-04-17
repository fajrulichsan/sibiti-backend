import { PartialType } from '@nestjs/mapped-types';
import { CreateSubtestDto } from './create-subtest.dto';

export class UpdateSubtestDto extends PartialType(CreateSubtestDto) {}

// import { IsOptional, IsString, IsNumber } from 'class-validator';

// export class UpdateSubtestDto {
//   @IsNumber()
//   eventId?: number;

//   @IsOptional()
//   @IsString()
//   name?: string;

//   @IsOptional()
//   @IsString()
//   deskripsi?: string;

//   @IsOptional()
//   @IsNumber()
//   jumlahSoal?: number;

//   @IsOptional()
//   @IsNumber()
//   opsi?: number;

//   @IsOptional()
//   @IsNumber()
//   waktu?: number;

//   @IsOptional()
//   @IsNumber()
//   status?: number;
// }
