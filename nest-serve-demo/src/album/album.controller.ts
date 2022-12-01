import { URL } from 'url'
import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import serverConfig from 'src/config/serve.config';
import CustomResponse from 'src/utils/response';


@Controller('album')
export class AlbumController {
	constructor(
		private readonly albumService: AlbumService,
		private readonly configService: ConfigService,
		private readonly customResponse: CustomResponse,
	) { }

	/**
	 * 文件上传 获取header的file文件
	 *  FileInterceptor()采用两个参数，一个fieldName（从保持一个文件的HTML表单指向场）和可选的options对象。这些MulterOptions等同于传递给multer构造函数
	 * @param file 
	 * @returns 
	 */
	@Post("upload")
	@UseInterceptors(FileInterceptor('file'))
	public upload(@UploadedFile() file) {
		const replacePath = this.configService.get('file').relpaceRoot
		const path = new URL(file.path.replace(replacePath, serverConfig.getBaseUrl()))
		return this.customResponse.success(path);
	}

	/**
	 * 下载文件
	 * @param res 
	 */
	@Get('export')
	public async downloadAll(@Res() res: Response) {
		// 基于流的下载方式
		const { filename, tarStream } = await this.albumService.downloadAll();
		// 设置响应头
		res.setHeader('Content-Type', 'application/octet-stream');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=${filename}`,
		);
		tarStream.pipe(res);  // 流转换到res响应
	}
}
