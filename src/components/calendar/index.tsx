import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useEvents } from "../../api/events";
import { useModalStore } from "../../store/modals";

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

  return (
    <FullCalendar
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
  );
};
