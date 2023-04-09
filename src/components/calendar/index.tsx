import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  CircularProgress,
  Fade,
  IconButton,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useRef, useState } from "react";

import { useEvent, useEvents } from "../../api/events";
import { useModalStore } from "../../store/modals";
import { UserHeader } from "../user-header";

export const Calendar = () => {
  const openInteractEventModal = useModalStore(
    (state) => state.openInteractEventModal
  );
  const setLastSelectedDate = useModalStore(
    (state) => state.setLastSelectedDate
  );
  const setInteractEventModalId = useModalStore(
    (state) => state.setInteractEventModalId
  );
  const { data: events } = useEvents();

  const [currentEventElement, setCurrentEventElement] =
    useState<HTMLElement | null>(null);
  const [currentEventId, setCurrentEventId] = useState("");

  const { data: currentEvent } = useEvent(currentEventId);

  const calendarRef = useRef<FullCalendar | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonthName = useMemo(() => {
    let m = currentDate.getMonth();
    const d = currentDate.getDate();

    if (d !== 1) m++;

    let monthName = "Декабрь";

    if (m === 12) monthName = "Январь";
    if (m === 1) monthName = "Февраль";
    if (m === 2) monthName = "Март";
    if (m === 3) monthName = "Апрель";
    if (m === 4) monthName = "Май";
    if (m === 5) monthName = "Июнь";
    if (m === 6) monthName = "Июль";
    if (m === 7) monthName = "Август";
    if (m === 8) monthName = "Сентябрь";
    if (m === 9) monthName = "Октябрь";
    if (m === 10) monthName = "Ноябрь";

    let y = currentDate.getFullYear();
    if (m === 12) y++;

    return `${monthName}, ${y}`;
  }, [currentDate]);

  return (
    <>
      <Popper
        transition
        open={currentEventElement !== null}
        anchorEl={currentEventElement}
        popperOptions={{
          placement: "auto",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [10, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            timeout={350}
            onExited={() => setCurrentEventId("")}
          >
            <Stack
              width={200}
              minHeight={80}
              spacing={1}
              direction="column"
              justifyContent="center"
              sx={{
                padding: 1,
                borderRadius: 2,
                backgroundColor: "white",
                boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
              }}
            >
              {currentEvent && (
                <>
                  <Typography sx={{ textAlign: "center" }}>
                    {currentEvent.title}
                  </Typography>
                  {currentEvent.exercises.map(({ title, sets, repeats }, i) => (
                    <Typography key={`event-${currentEvent.id}-exercise-${i}`}>
                      {title} ({sets} по {repeats})
                    </Typography>
                  ))}
                </>
              )}
              {!currentEvent && (
                <CircularProgress sx={{ alignSelf: "center" }} />
              )}
            </Stack>
          </Fade>
        )}
      </Popper>

      <Stack
        spacing={2}
        direction="column"
        sx={{ padding: 2 }}
        width="100%"
        height="100%"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={() => {
                if (!calendarRef.current) return;
                const api = calendarRef.current.getApi();
                api.prev();
              }}
            >
              <ArrowLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                if (!calendarRef.current) return;
                const api = calendarRef.current.getApi();
                api.next();
              }}
            >
              <ArrowRightIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Typography>{currentMonthName}</Typography>
          <UserHeader />
        </Stack>
        <FullCalendar
          initialDate={currentDate}
          datesSet={(info) => setCurrentDate(info.start)}
          ref={calendarRef}
          customButtons={{ user: { text: "Привет" } }}
          headerToolbar={false}
          buttonText={{
            today: "Сегодня",
          }}
          eventMouseEnter={(info) => {
            setCurrentEventElement(info.el);
            setCurrentEventId(info.event.id);
          }}
          eventMouseLeave={() => {
            setCurrentEventElement(null);
          }}
          eventClick={(data) => {
            if (!data.event.start) return;
            setInteractEventModalId(data.event.id);
            setLastSelectedDate(data.event.start);
            openInteractEventModal();
          }}
          selectable
          select={(data) => {
            setLastSelectedDate(data.start);
            openInteractEventModal();
          }}
          firstDay={1}
          locale="ru"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          height="100%"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      </Stack>
    </>
  );
};
