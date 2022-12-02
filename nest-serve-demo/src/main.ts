import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverConfig from './config/serve.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new Logger()
	});
	// 设置基础路径
	app.setGlobalPrefix("/api")
	//  开启跨域
	app.enableCors();
	// 配置静态资源访问
	app.useStaticAssets(join(__dirname, '..', 'public'));
	// 设置全局变量
	await app.listen(serverConfig.port, () => {
		Logger.debug('-----------------The nestjs server address has been enabled------------------------\n')
		console.log('	\x1B[36m%s\x1B[0m', `Intranet address： http://localhost:${serverConfig.port}`);
		console.log('	\x1B[36m%s\x1B[0m', `Network  address： ${serverConfig.getBaseUrl()}\n`);
		Logger.debug('-----------------The nestjs server address has been enabled------------------------')
	});
}
bootstrap();
