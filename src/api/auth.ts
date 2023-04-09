import axios from "axios";

import { useAppStore } from "../store/app";

export const signIn = async (login: string, password: string) => {
  const { data } = await axios.post<{ token: string }>("/auth", {
    login,
    password,
  });
  useAppStore.getState().setToken(data.token);
  axios.defaults.headers.authorization = data.token;
  return data;
};

export const signUp = async (name: string, login: string, password: string) => {
  const { data } = await axios.post<{ token: string }>("/register", {
    name,
    login,
    password,
  });
  useAppStore.getState().setToken(data.token);
  axios.defaults.headers.authorization = data.token;
  return data;
};

export const signOut = () => {
  useAppStore.getState().setToken("");
  axios.defaults.headers.authorization = "";
};
