import axios from "axios";
import { getUserToken } from "./userservice";
import { BASE_URL } from "../config";

export const getAllTherapist = () => {
  try {
    const token = getUserToken();
    return axios.get(`${BASE_URL}get_all_therapists/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};
export const getHandledChat = (chat) => {
  try {
    const token = getUserToken();
    return axios.get(`${BASE_URL}messages?conversation_id=${chat.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};

export const loginRequest = (credentials) => {
  try {
    return axios.post(`${BASE_URL}sign_in`, credentials);
  } catch (error) {}
};

export const messageRequest = (message) => {
  try {
    const token = getUserToken();

    return axios.get(`${BASE_URL}message/?message_id=${message.message_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {}
};

export const getConversations = () => {
  try {
    const token = getUserToken();

    return axios.get(`${BASE_URL}conversations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};
