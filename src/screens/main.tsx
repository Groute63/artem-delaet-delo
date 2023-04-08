import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import { Calendar } from "../components/calendar";
import { useAppStore } from "../store/app";

export const MainScreen = () => {
  const token = useAppStore((state) => state.token);

  return (
    <>
      {!token && <Navigate to="/auth" />}

      <Box width="100%" height="100%">
        <Calendar />
      </Box>
    </>
  );
};
