import { API_KEY_PUBLIC } from 'react-native-dotenv';

export function getHeaderPublicAccess() {
    const API_KEY = API_KEY_PUBLIC + "";
    
    return {
        headers: { 'content-length-xpto' : API_KEY }
    };
}

export function getHeaderPublicAccessPropertyOnly() {
    const API_KEY = API_KEY_PUBLIC + "";
    
    return { 'content-length-xpto' : API_KEY };
}
