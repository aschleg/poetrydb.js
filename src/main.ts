import axios from 'axios';
import { URL } from 'url';


export function get_poetry(input_term: string, search_term: string, search_type: string,
                        output: string, output_format: string) {

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

    let uri = new URL('http://poetrydb.org/');

    for (let p in parameters) {
        uri = new URL(p, uri);
    }

    return (axios.get(uri.toString()));
}
