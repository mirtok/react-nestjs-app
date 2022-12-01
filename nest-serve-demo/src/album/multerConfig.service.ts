import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
/**
 * 上传的文件配置服务
 */
@Injectable()
export class MulterConfigService extends ConfigService implements MulterOptionsFactory {
	constructor(props) {
		super(props)
	}
	createMulterOptions(): MulterModuleOptions {
		return {
			fileFilter(req: Request, file: any, cb: (error: Error, acceptFile: boolean) => void): void {
				// 需要调用回调函数 `cb`，
				// 并在第二个参数中传入一个布尔值，用于指示文件是否可接受
				// 如果要拒绝文件，上传则传入 `false`。如:
				// cb(null, false);
				// 如果接受上传文件，则传入 `true`。如:
				cb(null, true);
				// 出错后，可以在第一个参数中传入一个错误：
				// cb(new Error('I don\'t have a clue!'));
				// console.log(file.filename);
				// cb(null, false);
			},
			storage: diskStorage({
				// 就应的文件路径
				destination: join(this.get('file').root, `${new Date().toLocaleDateString()}`),
				// 对应的文件名和文件后缀的设置
				filename: (req, file, cb) => {
					return cb(null, `${new Date().getTime()}-${file.originalname}`);
				},
			}),
		};
	}
}
