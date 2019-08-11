import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";


interface PoetryDBClientConfig {
    baseUrl?: string;
}

export class PoetryDBClient {
    public http: AxiosInstance;
    private config: PoetryDBClientConfig;

    constructor(config: PoetryDBClientConfig) {
        this.config = config;
        this.http = axios.create({
            baseURL: config.baseUrl || 'http://poetrydb.org'
        });

        this.http.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error: AxiosError) => {
            if (error.response) {
                return Promise.reject(error.request, error.response);
            }

            return Promise.reject(error);
        });
    }

    get poetry(): Poetry {
        return new Poetry(this);
    }
}


export class Poetry extends PoetryDBClient {
    public async get_poetry(input_term: string, search_term: string, search_type: string,
                            output: string): Promise<AxiosResponse> {
        params = {

        }
    }
}