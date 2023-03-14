import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import serverConfig from './config/serve.config'
import { Logger } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import corsOptionsDelegate from './utils/corsOptionsDelegate'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: new Logger(),
    })
    // 设置基础路径
    app.setGlobalPrefix('/api')
    //  开启跨域 credentials:前端的axios 的withCredentials
    app.enableCors(corsOptionsDelegate)
    // 配置静态资源访问
    app.useStaticAssets(join(__dirname, '..', 'public'))
    // 配置cookie 中间件
    app.use(cookieParser())
    // 设置全局变量
    await app.listen(serverConfig.port, () => {
        Logger.debug('-----------------The nestjs server address has been enabled------------------------\n')
        console.log('	\x1B[36m%s\x1B[0m', `Intranet address： http://localhost:${serverConfig.port}`)
        console.log('	\x1B[36m%s\x1B[0m', `Network  address： ${serverConfig.getBaseUrl()}\n`)
        Logger.debug('-----------------The nestjs server address has been enabled------------------------')
    })
}
bootstrap()
