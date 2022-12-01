import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import CustomResponse from './utils/response';

@Module({
	imports: [AlbumModule],
	controllers: [AppController],
	providers: [AppService, CustomResponse],
})
export class AppModule { }
