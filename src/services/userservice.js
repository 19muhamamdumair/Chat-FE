// src/services/userService.js

const USER_KEY = "chatuser";
const USER_TOKEN = "token";

export const getUserToken = () => {
  const user = localStorage.getItem(USER_KEY);
  if(user) {
      const userData = JSON.parse(user);
      if(userData.access_token) {
        return userData.access_token;
      }else {
        return null;
      }
  }
  return null;
};
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
