import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import { CreateEventFormData } from "../modals/interact-event";
import { Event } from "./events";

axios.defaults.baseURL = import.meta.env.API_URL;

const serializeEvent = (data: CreateEventFormData, id?: Event["id"]): Event => {
  const { title, date, start, end, exercises } = data;

  const startTime = start.split(":").map((v) => parseInt(v, 10));
  const startTimeDate = dayjs(date)
    .set("hours", startTime[0])
    .set("minutes", startTime[1]);
  const endTime = end.split(":").map((v) => parseInt(v, 10));
  const endTimeDate = dayjs(date)
    .set("hours", endTime[0])
    .set("minutes", endTime[1]);

  const event = {
    id: id || nanoid(),
    title,
    start: startTimeDate.toISOString(),
    end: endTimeDate.toISOString(),
    exercises,
  };

  return event;
};

const mock = new MockAdapter(axios);
const events: Event[] = [
  {
    id: "0",
    title: "Тренировка",
    start: "2023-03-05T08:40:00",
    end: "2023-01-05T09:00:00",
    exercises: [],
  },
  {
    id: "1",
    title: "Тренировка",
    start: "2023-03-12T08:40:00",
    end: "2023-01-05T09:00:00",
    exercises: [],
  },
  {
    id: "2",
    title: "Бег",
    start: "2023-03-26T18:40:00",
    end: "2023-03-26T19:40:00",
    exercises: [],
  },
];

axios.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) console.log(response.config.url, response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mock.onGet(/\/event\/\S+/).reply((config) => {
  if (!config.url) return [500];

  const id = config.url.split("/")[2];
  if (typeof id !== "string") return [400];

  const event = events.find((event) => event.id === id);
  if (!event) return [404];
  return [200, event];
});

mock.onGet("/events").reply(200, events);
mock.onPost("/events").reply(({ data }) => {
  const eventData = JSON.parse(data) as CreateEventFormData;
  const event = serializeEvent(eventData);
  events.push(event);
  return [200, event];
});
mock.onPut(/\/event\/\S+/).reply((config) => {
  if (!config.url) return [500];
  const id = config.url.split("/")[2];
  if (typeof id !== "string") return [400];

  const eventIndex = events.findIndex((event) => event.id === id);
  if (eventIndex === -1) return [404];

  const eventData = JSON.parse(config.data) as CreateEventFormData;
  const newEvent = serializeEvent(eventData, id);

  events[eventIndex] = newEvent;

  return [200, newEvent];
});

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};
