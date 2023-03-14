import { Controller, Get, Req, Res } from '@nestjs/common'
import { CookieService } from './cookie.service'
import { Request, Response } from 'express'
@Controller('cookie')
export class CookieController {
    constructor(private readonly cookieService: CookieService) {}
    /**
     * domain          String      域名
     * expires         Date        过期时间(second)，时间点后cookie失效
     * httpOnly        Boolean     通过程序(js脚本，applet)无法读取cookie, 防止XSS攻击
     * maxAge          String      最大失效时间(毫秒) 设置在多少后失效
     * secure          Boolean     如果设置true, 则只在https中生效
     * path            String      cookie影响到的路径，默认根路径 / 如果设置的路径不匹配，则无法携带cookie
     * signed          Boolean     是否签名cookie, 设置为true则对这个cookie签名，需要用到res.signedCookies 而非res.cookies访问；被篡改后的签名会被服务器拒绝，cookie并会被重置
     */

    /**
     * 服务端设置cookie
     * @param req 
     * @param res 
     * @returns 
     */
    @Get('set')
    public setCookie(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // 设置cookie 有效期1天，只有后端可读取cookie
        res.cookie('token', 'abc' + Date.now(), { maxAge: 1000 * 60, httpOnly: true })
        return {
            ...req.query,
        }
    }

    /**
     * 获取存储的cookit
     * @param req 
     * @returns  
     */
    @Get('get')
    public getCookie(@Req() req: Request) {
        return {
            ...req.cookies,
        }
    }
}
