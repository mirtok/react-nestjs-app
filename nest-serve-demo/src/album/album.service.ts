import { Injectable, Inject } from '@nestjs/common';
import { zip } from 'compressing';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlbumService {
	constructor(private readonly configService: ConfigService) { }

	async upload(file) {
	}

	async downloadAll() {
		const uploadDir = this.configService.get('file').root;
		const tarStream = new zip.Stream(); // 文件压缩流
		await tarStream.addEntry(uploadDir); // 压缩文件路径
		return { filename: 'all.zip', tarStream };
	}
}
