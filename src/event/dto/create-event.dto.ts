// create-event.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsNotEmpty({ message: 'Tanggal Publish tidak boleh kosong' })
  publish: string;

  @IsNotEmpty({ message: 'Tanggal Duedate tidak boleh kosong' })
  dueDate: string;

  @IsNotEmpty({ message: 'Harga tidak boleh kosong' })
  @IsNumber({}, { message: 'Harga harus berupa angka' })
  harga: number;

  @IsNotEmpty({ message: 'Subtest tidak boleh kosong' })
  @IsNumber({}, { message: 'Subtest harus berupa angka' })
  subtest: number;

  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsNumber({}, { message: 'Status harus berupa angka' })
  status: number;
}
