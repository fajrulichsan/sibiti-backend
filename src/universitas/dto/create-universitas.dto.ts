import { IsNotEmpty } from 'class-validator';

export class CreateUniversitasDto {
  @IsNotEmpty({ message: 'Kode is required' })
  kode: number;

  @IsNotEmpty({ message: 'Nama is required' })
  nama: string;

}
