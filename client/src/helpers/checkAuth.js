import decode from 'jwt-decode';

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
