import { Box, Button, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import { styled } from "@mui/material/styles";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import auth, { fetchLoginCredentials } from "../../redux/slices/auth";
import CircularProgress from "@mui/material/CircularProgress";

const LogoContainer = styled("img")<any>(({ theme }) => ({
  width: "100%",
  padding: "20px",
  opacity: 1,
  zIndex: 99,
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30%",
  },
}));

const Login = () => {
  const {
    auth: { accessToken, isLoading },
    settings: { themeMode },
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

  const handleLogin = () => {
    dispatch(fetchLoginCredentials(23));
  };

  return (
    <>
      <LogoContainer src={Logo} />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{color:"blue"}}/>
        ) : (
          <Button
            sx={{ px: 4, py: 2 }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </Box>
      <Typography
        sx={{ mt: 3, p: 1, zIndex: 99, textAlign: "center" }}
        variant="h3"
        fontSize="22px"
      >
        Press Login button to access Dashboard
      </Typography>
    </>
  );
};

export default Login;
