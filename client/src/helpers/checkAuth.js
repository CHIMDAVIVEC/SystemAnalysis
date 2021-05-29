import decode from 'jwt-decode';

//Вспомогательные функции получения информации из токена
//Проверка авторизации по наличию корректного токена
const checkAuth = () => {
  const token = localStorage.getItem('howard_shores');
  if (!token) return false;

  try {
    const { _id } = decode(token);
    return _id;
  } catch (e) {
    return false;
  }
};

//Получение роли
export const checkRole = () => {
  const token = localStorage.getItem('howard_shores');
  if (!token) return null;

  try {
    const { role } = decode(token);
    return role;
  } catch (e) {
    return null;
  }
};

//Получение идентификатора
export const getId = () => {
  const token = localStorage.getItem('howard_shores');
  if (!token) return null;

  try {
    const { _id } = decode(token);
    return _id;
  } catch (e) {
    return null;
  }
};

export default checkAuth;
