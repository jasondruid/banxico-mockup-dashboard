import { Outlet } from "react-router-dom";
import { Box} from "@mui/material";
import { styled } from "@mui/material/styles";
import Bankbg from "../../assets/banxicobg.jpg";
import isAuth from "../../hooks/isAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/*  const MainBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
})); */

const MainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  position: "relative",
});

const Background = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  opacity: 0.6,
  filter: `blur(4px)`,
  objectFit: "cover",
});

const MinimalLayout = () => {
  const authCheck = isAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(authCheck) navigate("/dashboard/home");
  },[authCheck]);

  authCheck && <></>;

  return (
    <>
      <MainBox>
        <Background src={Bankbg} />
        <Outlet />
      </MainBox>
    </>
  );
};
export default MinimalLayout;
