import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { CookieModule } from './cookie/cookie.module';
import CustomResponse from './utils/response';

@Module({
  imports: [AlbumModule, CookieModule],
  controllers: [AppController],
  providers: [AppService, CustomResponse],
})
export class AppModule {}
