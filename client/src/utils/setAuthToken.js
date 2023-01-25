// check if a token is passed in ? set it to default header : delete from default header
import axios from "axios";

const setAuthToken = token => {
    if (token)
        axios.defaults.headers.common['x-auth-token'] = token;
    else
        delete axios.defaults.headers.common['x-auth-token'];
}

export default setAuthToken;