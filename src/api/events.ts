import axios from "axios";
import useSWR, { mutate } from "swr";

import { CreateEventFormData } from "../modals/interact-event";
import {fetcher} from "./fetcher";
/*import { fetcher } from "./fetcher";*/

export interface Exercise {
  title?: string;
  sets?: number;
  repeats?: number;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  exercises: Exercise[];
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const useEvents = () =>
  useSWR<Omit<Event, "exercies">[]>("/events", fetcher, { refreshInterval: 0 });
export const useEvent = (id: Event["id"] | null) =>
  useSWR<Event>(id ? `/events/${id}` : null, fetcher, { refreshInterval: 0 });

export const createEvent = async (event: CreateEventFormData) => {
  const { data } = await axios.post("/events", event);
  await mutate<Event[]>("/events");
  await mutate<Event[]>(`/events/${data.id}`, data, false);
};
export const editEvent = async (
  id: Event["id"],
  event: CreateEventFormData
) => {
  const { data } = await axios.put(`/events/${id}`, event);
  await mutate<Event[]>("/events");
  await mutate<Event[]>(`/event/${data.id}`, data, false);
};

export const deleteEvent = async (id: Event["id"]) => {
  const { data } = await axios.delete(`/events/${id}`);
  await mutate<Event[]>("/events");
  await mutate<Event[]>(`/event/${data.id}`, data, false);
};
