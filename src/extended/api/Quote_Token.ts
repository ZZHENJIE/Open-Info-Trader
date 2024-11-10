import CryptoJS from 'crypto-js';

interface RequestConfig {
    transitional: {
        silentJSONParsing: boolean;
        forcedJSONParsing: boolean;
        clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | any)[];
    transformResponse: (null | any)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, any>;
    headers: {
        Accept: string;
    };
    baseURL: string;
    signal: Record<string, any>;
    method: string;
    url: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
}

export function CreateRequestConfig(
    url: string,
    method: string,
    params?: Record<string, any>,
    data?: Record<string, any>,
){
    const Template:RequestConfig = {
        transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false,
        },
        adapter: ["xhr", "http"],
        transformRequest: [null],
        transformResponse: [null],
        timeout: 5000,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {},
        headers: {
            Accept: "application/json, text/plain, */*",
        },
        baseURL: "/quote-api/quote-v2",
        signal:{},
        method: method,
        url: url
    };

    if (params) {
        Template.params = params;
    }

    if (data) {
        Template.data = data;
    }

    return Template;
}

// HMAC SHA512 加密函数
function hmacEncrypt(text: string, key: string): string {
    return CryptoJS.HmacSHA512(text, key).toString();
}

// SHA256 加密函数
function sha256Encrypt(text: string, key?: object): string {
    return CryptoJS.SHA256(text, key).toString();
}

// 处理异常数据并转换为 JSON 字符串
function normalizeData(data: Record<string, any>): string {
    const normalized: Record<string, string> = {};
    
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== undefined) {
            normalized[key] = String(data[key]);
        }
    }
    
    return JSON.stringify(normalized);
}

// 生成 token 的核心逻辑
export function GenerateToken(data: { data?: any; params?: any }): string {
    const temp = (function(data) {
        data.length <= 0 && (data = "quote");
        return sha256Encrypt(hmacEncrypt(data, "quote_web").toString().slice(0, 10)).toString().slice(0, 10);
    })(JSON.stringify(data.data) || normalizeData(data.params) || "{}");
    
    return temp;
}

export default{
    CreateRequestConfig,
    GenerateToken
}