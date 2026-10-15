import axios from "axios";

const BASE = "https://fmd-api-2026.onrender.com/api";
axios.defaults.withCredentials = true;

export const register = (data) => axios.post(`${BASE}/auth/register/`, data);
export const login = (data) => axios.post(`${BASE}/auth/login/`, data);
export const logout = () => axios.post(`${BASE}/auth/logout/`);
export const me = () => axios.get(`${BASE}/auth/me/`);

export const predict = (formData) =>
  axios.post(`${BASE}/predict/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getHistory = () => axios.get(`${BASE}/history/`);
export const getLearnTopics = () => axios.get(`${BASE}/learn/`);
export const getLearnDetail = (topic) => axios.get(`${BASE}/learn/${topic}/`);
export const askAssistant = (question) =>
  axios.post(`${BASE}/assistant/`, { question });