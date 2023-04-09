import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { signIn, signUp } from "../api/auth";

export const AuthScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { mode } = useParams<{ mode?: "register" }>();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">
          {mode === "register" ? "Регистрация" : "Вход"}
        </Typography>
        <Stack
          width={600}
          padding={2}
          spacing={2}
          direction="column"
          sx={{ boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)" }}
        >
          {mode === "register" && (
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              required
              label="Имя"
            />
          )}
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={login}
            onChange={({ target: { value } }) => setLogin(value)}
            required
            label="Логин"
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
            label="Пароль"
          />
          <Button
            onClick={async () => {
              if (mode === "register") await signUp(name, login, password);
              await signIn(login, password);
              navigate("/");
            }}
          >
            {mode === "register" ? "Зарегистрироваться" : "Войти"}
          </Button>
          <Button
            onClick={() =>
              navigate({
                pathname: mode === "register" ? "/auth" : "/auth/register",
              })
            }
          >
            {mode === "register" ? "Назад" : "Регистрация"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
