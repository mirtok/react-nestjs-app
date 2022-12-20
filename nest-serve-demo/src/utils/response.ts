import { Injectable } from "@nestjs/common";

/**
 * 通用返回数据结构
 */
export interface IHttpRet<T = unknown> {
	/** 错误码 */
	code: number;
	/** 返回的错误信息 */
	message?: string;
	/** 返回的数据 */
	data?: T;
	/** 请求时的url */
	url?: string;
}

/**
 * 返回值工具类
 */
@Injectable()
export default class CustomResponse {
	/**
	 * 
	 * @param code  错误码
	 * @param message  错误信息
	 * @param data  返回的数据
	 * @param paramURL 请求时的url
	 * @returns  请求返回的数据对象
	 */
	public result<T = unknown>(code: number, message?: string, data?: T, paramURL?: string): IHttpRet<T> {
		return {
			code: code,
			message: message,
			data: data,
			url: paramURL,
		};
	}

	/**
	 * 成功的返回
	 * @param message 
	 * @param data 
	 * @returns 
	 */
	public success<T = unknown>(data?: T): IHttpRet<T> {
		return this.result(200, "success", data)
	}

	/**
	 * 失败的返回
	 * @param message 
	 * @param data 
	 * @returns 
	 */
	public fail<T = unknown>(data?: T): IHttpRet<T> {
		return this.result(500, "error", data)
	}
}