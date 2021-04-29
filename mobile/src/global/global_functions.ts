import { RESTFUL_API_KEY, RESTFUL_API_KEY_VALUE } from 'react-native-dotenv';

export function getHeaderPublicAccess() {
    const API_KEY = RESTFUL_API_KEY + "";
    const API_KEY_VAL = RESTFUL_API_KEY_VALUE + "";
    
    return {
        headers: { [API_KEY] : API_KEY_VAL }
    };
}

export function getHeaderPublicAccessPropertyOnly() {
    const API_KEY = RESTFUL_API_KEY + "";
    const API_KEY_VAL = RESTFUL_API_KEY_VALUE + "";
    
    return { [API_KEY] : API_KEY_VAL };
}
