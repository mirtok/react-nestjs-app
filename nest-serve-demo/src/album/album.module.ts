import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import fileConfig from '../config/file.config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MulterConfigService } from './multerConfig.service';
import CustomResponse from 'src/utils/response';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [fileConfig],
		}),
		MulterModule.registerAsync({
			useClass: MulterConfigService
		})
	],
	controllers: [AlbumController],
	providers: [AlbumService, CustomResponse],
})
export class AlbumModule { }


