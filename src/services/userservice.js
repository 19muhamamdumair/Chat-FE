// src/services/userService.js

const USER_KEY = 'user';

export const getUserInfo = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_KEY);
};
