import React, { createContext, useReducer, useCallback } from 'react';
import userReducer from './AuthReducer';
import axios from 'axios';
import * as types from './authActionTypes';

const initialAuthState = {
  loading: false,
  error: false,
  token: null,
  errResponse: null
};

export const AuthContext = createContext(initialAuthState);

//Функции отправки запросов и заполнения контекста в зависимости от ответа сервера
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthState);

  const AuthReset = () => {
    dispatch({
      type: types.AUTH_RESET
    });
  };
  //Авторизация
  const LoginAction = useCallback(async (data) => {
    dispatch({
      type: types.AUTH_START
    });
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('howard_shores', res.data.access_token);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data.access_token
      });
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        AuthReset,
        LoginAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
