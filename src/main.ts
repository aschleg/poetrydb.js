import { AxiosError, AxiosInstance, AxiosResponse } from "axios";


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
                return Promise.reject(error.request);
            }

            return Promise.reject(error);
        });
    }


    public async get_poetry(input_term: string, search_term: string, search_type: string,
                            output: string, output_format: string): Promise<AxiosResponse> {

        if (search_term !== null && input_term !== 'linecount') {
            search_term = search_term + ':abs'
        }

        if (output_format !== null || output_format !== '') {

            if (output_format !== null) {
                output = output + '.' + output_format
            }
        }

        let parameters = [input_term, search_term, output];

        for (var i = 0; i < parameters.length, i++;) {
            if (parameters[i] === null ||
                parameters[i] === '') {
                parameters.splice(i, 1);
                i--;
            }
        }

        var uri = new URL('/');

        for (p in parameters) {
            uri = new URL(p, uri);
        }

        return this.http.get(uri);
    }

}