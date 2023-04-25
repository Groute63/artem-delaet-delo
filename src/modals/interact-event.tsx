import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  createEvent,
  deleteEvent,
  editEvent,
  Exercise,
  useEvent,
} from "../api/events";
import { useModalStore } from "../store/modals";

interface CreateEventForm {
  title: string;
  start: string;
  end: string;
  exercises: Exercise[];
}

export interface CreateEventFormData {
  title: string;
  start: string;
  end: string;
  exercises: Exercise[];
  date: Date;
}

export const InteractEventModal = () => {
  const interactEventModalId = useModalStore(
    (state) => state.interactEventModalId
  );
  const setInteractEventModalId = useModalStore(
    (state) => state.setInteractEventModalId
  );
  const isInteractEventModalVisible = useModalStore(
    (state) => state.isInteractEventModalVisible
  );
  const closeInteractEventModal = useModalStore(
    (state) => state.closeInteractEventModal
  );
  const lastSelectedDate = useModalStore((state) => state.lastSelectedDate);

  const { data: event } = useEvent(interactEventModalId);

  const { register, handleSubmit, control, watch, reset, setValue } =
    useForm<CreateEventForm>({
      defaultValues: { exercises: [{}] },
    });
  const {
    fields: events,
    append,
    remove,
  } = useFieldArray({ control, name: "exercises" });
  const formData = watch();

  const onClose = () => {
    closeInteractEventModal();
    reset();
    setInteractEventModalId(null);
  };
  const onSubmit = async (data: CreateEventForm) => {
    if (!lastSelectedDate) return;

    const filteredExercises = data.exercises.filter((exercise) =>
      Boolean(exercise.title)
    );
    const filteredData = { ...data, exercises: filteredExercises };
    const filteredDataWithDate = { ...filteredData, date: lastSelectedDate };
    if (interactEventModalId)
      await editEvent(interactEventModalId, filteredDataWithDate);
    else await createEvent(filteredDataWithDate);
    onClose();
  };

  useEffect(() => {
    if (!event) return;
    const startTime = dayjs.utc(event.start);
    const endTime = dayjs.utc(event.end);

    setValue("start", startTime.format("HH:mm"));
    setValue("end", endTime.format("HH:mm"));
    setValue("title", event.title);
    if (event.exercises.length) {
      setValue("exercises", event.exercises);
      append({ title: "" });
    }
  }, [event]);

  async function onDelete(id: string) {
    await deleteEvent(id);
    onClose();
  }

  return (
    <Modal open={isInteractEventModalVisible} onClose={onClose}>
      <Box
        style={{ overflowY: "scroll", maxHeight: 700 }}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        width={600}
        padding={2}
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <Typography variant="h3">
          {interactEventModalId ? "Смотрим" : "Создаём новую"} треню
        </Typography>
        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
          <TextField
            {...register("title")}
            fullWidth
            required
            label="Название тренировки"
          />
          <Stack direction="row" spacing={2}>
            <TextField
              {...register("start")}
              fullWidth
              label="Когда качаемся"
              required
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              {...register("end")}
              fullWidth
              label="Когда не качаемся"
              required
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          {events.map((field, index) => (
            <Stack
              key={field.id}
              direction="row"
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              <TextField
                {...register(`exercises.${index}.title`, {
                  onChange: ({ target }) => {
                    if (target.value && index === events.length - 1)
                      append({ title: "" }, { shouldFocus: false });
                  },
                })}
                label="Название упражнения"
                required={index !== events.length - 1}
                fullWidth
                sx={{ flex: 3 }}
              />
              <TextField
                {...register(`exercises.${index}.sets`, {
                  valueAsNumber: true,
                })}
                type="number"
                label="сеты"
                fullWidth
                sx={{ flex: 1 }}
              />
              <TextField
                {...register(`exercises.${index}.repeats`, {
                  valueAsNumber: true,
                })}
                type="number"
                label="повторы"
                fullWidth
                sx={{ flex: 1 }}
              />
              {formData.exercises.length > 1 && (
                <Box
                  onClick={() => remove(index)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton size="medium">
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
          ))}
          {interactEventModalId ? (
            <Button onClick={() => onDelete(event!.id)}>Удалить</Button>
          ) : (
            ""
          )}
          <Button type="submit">Готово</Button>
        </Stack>
      </Box>
    </Modal>
  );
};
