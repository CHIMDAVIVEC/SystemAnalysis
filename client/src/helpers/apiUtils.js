import axios from 'axios';

const ClientAPI = axios.create();

//Вспомогательная функция-конструктор запросов
//Добавляет токен пользователя в запрос
ClientAPI.interceptors.request.use(function (config) {
  console.log('Request Sent');
  const token = localStorage.getItem('howard_shores');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default ClientAPI;
