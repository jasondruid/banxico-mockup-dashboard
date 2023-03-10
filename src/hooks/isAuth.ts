import { useCustomSelector } from "./redux";
import { useState, useEffect } from "react";

const IsAuthHook = () => {
  const {
    auth: { accessToken },
  } = useCustomSelector((state) => state);

  const [isAuth, setIsAuth] = useState(
    accessToken !== null && accessToken !== "" && accessToken !== undefined
  );

  useEffect(() => {
    if (
      accessToken !== null &&
      accessToken !== "" &&
      accessToken !== undefined
    ) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [accessToken]);

  return isAuth;
};

export default IsAuthHook;
