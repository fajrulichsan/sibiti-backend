import { IsNotEmpty } from 'class-validator';

export class CreateSubtestDto {
  @IsNotEmpty()
  eventId: number;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  deskripsi: string;

  @IsNotEmpty()
  jumlahSoal: string;

  @IsNotEmpty()
  opsi: number;

  @IsNotEmpty()
  waktu: number;

  @IsNotEmpty()
  status: number;
}
