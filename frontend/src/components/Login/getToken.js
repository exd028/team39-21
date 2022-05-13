import React from 'react'

export default function getToken() {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString == null) return null;
    return JSON.parse(tokenString).token;
}
