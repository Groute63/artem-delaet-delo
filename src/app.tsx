import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { InteractEventModal } from "./modals/interact-event";
import { AuthScreen } from "./screens/auth";
import { MainScreen } from "./screens/main";
import { useAppStore } from "./store/app";

export const App = () => {
  const token = useAppStore((state) => state.token);
  if (token) {
    console.log(token); 
    axios.defaults.headers.authorization = `Bearer ${token}`;
  }
  /*useEffect(() => {
    console.log(token);
    if (token) {
      axios.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);*/

  return (
    <>
      <InteractEventModal />
      <Box width="100%" height="100%" display="flex">
        <Routes>
          <Route index element={<MainScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/auth/:mode" element={<AuthScreen />} />
        </Routes>
      </Box>
    </>
  );
};
