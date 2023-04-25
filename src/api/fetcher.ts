import axios, { AxiosError } from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) console.log(response.config.url, response.data);
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (import.meta.env.DEV && error.config)
        console.log(error.config.url, error.config.data);
    }
    console.error(error);
    return Promise.reject(error);
  }
);

/*axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const login = useAppStore((state) => state.login);
      const password = useAppStore((state) => state.password);
      console.log("Ошибка 403: Доступ запрещен");
      const { data } = await axios.post<{ token: string }>("/login", {
        login,
        password,
      });
      useAppStore.getState().setToken(data.token);
      axios.defaults.headers.authorization = data.token;
    }
    return Promise.reject(error);
  }
);*/

/*const mock = new MockAdapter(axios);

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
];*/

/*mock.onGet(/\/event\/\S+/).reply(async (config) => {
  if (!config.url) return [500];

  const id = config.url.split("/")[2];
  if (typeof id !== "string") return [400];

  const event = events.find((event) => event.id === id);
  if (!event) return [404];

  const delay = () =>
    new Promise<void>((res) => {
      setTimeout(() => res(), 500);
    });

  await delay();

  return [200, event];
});*/

/*mock.onGet("/events").reply(200, events);
mock.onPost("/events").reply(({ data }) => {
  const eventData = JSON.parse(data) as CreateEventFormData;
  const event = serializeEvent(eventData);
  events.push(event);
  return [200, event];
});*/
/*mock.onPut(/\/event\/\S+/).reply((config) => {
  if (!config.url) return [500];
  const id = config.url.split("/")[2];
  if (typeof id !== "string") return [400];

  const eventIndex = events.findIndex((event) => event.id === id);
  if (eventIndex === -1) return [404];

  const eventData = JSON.parse(config.data) as CreateEventFormData;
  const newEvent = serializeEvent(eventData, id);

  events[eventIndex] = newEvent;

  return [200, newEvent];
});*/

/*mock.onPost("/auth").reply(() => {
  return [200, { token: nanoid() }];
});
mock.onPost("/register").reply(() => {
  return [200, { token: nanoid() }];
});

mock.onGet("/profile/me").reply(() => {
  return [200, { name: "User 1" }];
});*/

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};
