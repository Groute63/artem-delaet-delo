import dayjs from "dayjs";
import { nanoid } from "nanoid";

import { Event } from "./api/events";
import { CreateEventFormData } from "./modals/interact-event";

export const serializeEvent = (
  data: CreateEventFormData,
  id?: Event["id"]
): Event => {
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
