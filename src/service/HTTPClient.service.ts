import { HttpRequestConfig, HttpResponse, IHTTPClient } from "../contract/services/iHTTPCliente.service";
import axios from 'axios'
import { injectable } from 'tsyringe';

@injectable()
export class HTTPClient implements IHTTPClient {
    get<T>(url: string, requestConfig?: HttpRequestConfig): Promise<HttpResponse<T>> {
        return axios.get(url)
    }
}