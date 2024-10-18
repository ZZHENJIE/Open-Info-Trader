import CryptoJS from 'crypto-js';

// 定义请求配置类型
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
    params: Record<string, any>;
    baseURL: string;
    method: string;
    url: string;
}

// 定义请求配置
const requestConfig: RequestConfig = {
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
    params: {},
    baseURL: "/quote-api/quote-v2",
    method: "get",
    url: "/user-broker",
};

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
function generateToken(data: { data?: any; params?: any }): string {
    const temp = (function(data) {
        data.length <= 0 && (data = "quote");
        return sha256Encrypt(hmacEncrypt(data, "quote_web").toString().slice(0, 10)).toString().slice(0, 10);
    })(JSON.stringify(data.data) || normalizeData(data.params) || "{}");
    
    return temp;
}

// 获取 token 的主函数
export default function getToken(params?: Record<string, any>): string {
    requestConfig.params = params || {}; // 更新请求参数
    return generateToken(requestConfig);
}



// 定义事件处理器
// export default defineEventHandler(async (event) => {
//     return readBody(event).then(body => {
//         return CreateApiResponse({status:200} as Response,'success',getToken(body))
//     })
// });