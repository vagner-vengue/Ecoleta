
export function getHeaderPublicAccess() {
    const API_KEY = process.env.REACT_APP_API_KEY + "";
    const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE + "";
    
    return {
        headers: { [API_KEY] : API_KEY_VALUE }
    };
}

export function getHeaderPublicAccessPropertyOnly() {
    const API_KEY = process.env.REACT_APP_API_KEY + "";
    const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE + "";
    
    return { [API_KEY] : API_KEY_VALUE };
}
