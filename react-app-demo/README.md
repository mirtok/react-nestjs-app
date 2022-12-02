## 前后端数据交互格式

###四种常见的 POST 提交数据方式


| 值                                | 描述                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------- |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                                 |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。                 |
| application/json                  | 作为请求头告诉服务端消息主体是序列化的JSON字符串。除低版本的IE，基本都支持。 |
| text/plain                        | 空格转换为 “+” 加号，但不对特殊字符编码。                                    |


1. `application/x-www-form-urlencoded` HTTP中默认的提交数据的方式
	浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求类似于下面这样（无关的请求头在本文中都省略掉了）：
```txt
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

2. `multipart/form-data` 一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须将 的 enctype设为 multipart/form-data。

`注意：以上两种方式：application/x-www-form-urlencoded和multipart/form-data都是浏览器原生支持的。`

3. `application/json` 新一代请求格式
`用来告诉服务端消息主体是序列化的JSON字符串，除了低版本的IE，基本都支持。服务端有处理JSON的函数，使用不会有任何麻烦`

```json
{
	"title":"test",
	"sub":[1,2,3]
}
```