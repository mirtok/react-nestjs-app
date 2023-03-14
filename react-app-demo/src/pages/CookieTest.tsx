import { Card, Button, Space, message } from 'antd';
import Cookies from 'js-cookie';
import React, { FC, useState } from 'react';
import request from '../utils/request';

const CookieTest: FC<{ className: string }> = (props) => {
    const [frontData, setFrontData] = useState<string>('');
    const [backData, setBackData] = useState<string>('');
    // 实例化 httpOnly 仅仅http 可以访问
    const myCookie = Cookies.withAttributes({ expires: 7, httpOnly: true });
    // 获取存储的cookie
    const sendRequest = async () => {
        const res = await request.get('/api/cookie/get');
        setBackData(res !== null ? JSON.stringify(res) : '');
    };
    // 发送请求后端设置cookie
    const sendSetCookieRequest = async () => {
        await request.get('/api/cookie/set', {
            params: { login: 'admin' }
        });
        message.success('后端设置httpOnly Cookie成功');
    };
    // 前端设置cookie
    const frontSetCookie = () => {
        myCookie.remove('foo');
        myCookie.set('foo', '前端存储Cookie数据');
        message.success('前端设置httpOnly Cookie成功');
    };
    // 前端获取cookie
    const frontGetData = () => {
        const data = myCookie.get('foo');
        const token = myCookie.get('token');
        console.log('====================================');
        console.log(data,token);
        console.log('====================================');
        setFrontData(String(data));
    };
    return (
        <Card
            className={props.className}
            title="Cookie 测试"
            extra={null}
            style={{ width: '100%' }}
        >
            <Space direction="vertical" size="middle">
                <Button type="primary" onClick={sendSetCookieRequest}>
                    后端设置: 发起请求后端会响应客服端cookie 并设置httpOnly
                </Button>
                <Button ghost danger onClick={frontSetCookie}>
                    前端设置： 通过Cookie设置 httpOnly cookie 并设置
                </Button>
                <b style={{ color: 'teal', fontSize: 20 }}>
                    设置完点击"发送请求"按钮 查看控制台network
                </b>
                <Button type="primary" ghost onClick={sendRequest}>
                    发送请求,通过后端获取cookie 返回前端
                </Button>
                <Button type="primary" ghost onClick={frontGetData}>
                    通过document.cookies获取请求
                </Button>

                <div>
                    <p>前端读取数据：{frontData}</p>
                    <p>后端读取数据：{backData}</p>
                </div>
            </Space>
        </Card>
    );
};

export default CookieTest;
