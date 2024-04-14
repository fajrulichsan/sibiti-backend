import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { SoalModule } from './soal/soal.module';
import { UniversitasModule } from './universitas/universitas.module';

@Module({
  imports: [ UserModule, ProfileModule, AuthModule, EventModule, SoalModule, UniversitasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
