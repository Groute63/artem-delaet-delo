import axios from "axios";

import { useAppStore } from "../store/app";

export const signIn = async (login: string, password: string) => {
  const { data } = await axios.post<{ token: string }>("/login", {
    login,
    password,
  });
  useAppStore.getState().setToken(data.token);
  useAppStore.getState().setLogin(login);
  useAppStore.getState().setPassword(password);
  axios.defaults.headers.authorization = data.token;
  return data;
};

export const signUp = async (name: string, login: string, password: string) => {
  const { data } = await axios.post<{ token: string }>("/registration", {
    name,
    login,
    password,
  });
  useAppStore.getState().setToken(data.token);
  useAppStore.getState().setLogin(login);
  useAppStore.getState().setPassword(password);
  axios.defaults.headers.authorization = data.token;
  return data;
};

export const signOut = () => {
  useAppStore.getState().setLogin("");
  useAppStore.getState().setPassword("");
  useAppStore.getState().setToken("");
  axios.defaults.headers.authorization = "";
};
