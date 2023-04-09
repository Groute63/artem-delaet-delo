import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";

import { signOut } from "../../api/auth";
import { useProfile } from "../../api/profile";

export const UserHeader = () => {
  const { data: profile } = useProfile();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar src="https://assets.website-files.com/61554cf069663530fc823d21/6369fed004b5b041b7ed686a_download-8-min.png" />
        {profile && <Typography>{profile.name}</Typography>}
      </Stack>
      <IconButton onClick={signOut}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
};
