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
  } catch (error) { }
};

export const getAllParents = () => {
  try {
    const token = getUserToken();
    return axios.get(`${BASE_URL}get_all_parents/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) { }
};
export const getHandledChat = (chat) => {
  try {
    const token = getUserToken();
    return axios.get(`${BASE_URL}messages?conversation_id=${chat.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) { }
};

export const changeConversationStatus = async (conversationId, status) => {
  try {
    const token = getUserToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      conversation_id: conversationId,
      status: status,
    };
    const response = await axios.post(`${BASE_URL}change_conversation_status/`, body, { headers });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMessage = async (content, conversation, sender) => {
  try {
    const token = getUserToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      content: content,
      conversation: conversation,
      sender: sender
    };
    const response = await axios.post(`${BASE_URL}messages/`, body, { headers });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const loginRequest = (credentials) => {
  try {
    return axios.post(`${BASE_URL}sign_in`, credentials);
  } catch (error) { }
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
  } catch (error) { }
};

export const getConversations = async () => {

  try {
    const token = getUserToken();


    let response = await axios.get(`${BASE_URL}conversations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response
    // console.log(data)
  } catch (error) {

    console.log(error);

  }
};
