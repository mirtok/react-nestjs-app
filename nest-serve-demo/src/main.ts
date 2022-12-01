import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverConfig from './config/serve.config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	// 设置基础路径
	app.setGlobalPrefix("/api")
	//  开启跨域
	app.enableCors();
	// 配置静态资源访问
	app.useStaticAssets(join(__dirname, '..', 'public'));
	// 设置全局变量
	await app.listen(serverConfig.port, () => {
		console.log('================server start====================');
		console.log(`${serverConfig.getBaseUrl()}`,);
		console.log('================server start====================');
	});
}
bootstrap();
