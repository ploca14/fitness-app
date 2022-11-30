import { useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function useUser() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };
  const [token, setToken] = useState(getToken());
  const user = token ? jwt_decode(token) : null;

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
    user
  }
}