import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { InteractEventModal } from "./modals/interact-event";
import { AuthScreen } from "./screens/auth";
import { MainScreen } from "./screens/main";

export const App = () => {
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
