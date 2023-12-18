import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:5001/',
});


// export const get = async (path, options = {}) => {
//     const response = await httpRequest.post(path, options);
//     return response.data;
// };

export default httpRequest;
