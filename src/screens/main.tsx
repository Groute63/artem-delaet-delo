import { Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

import { Calendar } from "../components/calendar";
import { useAppStore } from "../store/app";

export const MainScreen = () => {
  const token = useAppStore((state) => state.token);

  if (!token) return <Navigate to="/auth" />;

  return (
    <Stack width="100%" height="100%" direction="column">
      <Calendar />
    </Stack>
  );
};
