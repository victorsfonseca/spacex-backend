export interface HttpRequestConfig {
    headers?: Record<string, string>;
    data?: any;
}
  
export interface HttpResponse<T> {
    status: number;
    data: T;
}

export interface IHTTPClient {
    get<T>(url: string, requestConfig?: HttpRequestConfig): Promise<HttpResponse<T>>
}