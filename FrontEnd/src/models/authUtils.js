export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getHeader() {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `${token}`;
    }

    return headers;
}