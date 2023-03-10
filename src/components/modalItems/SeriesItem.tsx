import { Button, useTheme,useMediaQuery } from "@mui/material";
import React from "react";

interface SerieItem {
  display_name: string;
  unit_id: string;
  clickHandler: Function;
  isSelected?: Boolean | void;
}

const SeriesItem = ({
  display_name,
  unit_id,
  clickHandler,
  isSelected = false,
}: SerieItem) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));


  return (
    <Button
      variant="contained"
      sx={{
        fontSize: {
          xs: "11px",
          md: "14px",
          lg: "12px",
          width: "100%",
          fontWeight: "normal",
          textTransform: "capitalize",
          backgroundColor: isSelected ? "gray" : "white",
          "&:hover": {
            backgroundColor: isSelected ? "gray" : "gray",
          },
        },
        minHeight: { xs: "115px", sm: "60px" },
        maxHeight: { xs: "115px", sm: "60px" },
        maxWidth: "670px",
      }}
      onClick={() => clickHandler()}
    >
      {match  ? display_name.substring(0, 150) : display_name.substring(0, 120) } {display_name.length > 150 ? "..." : ""}
    </Button>
  );
};

export default SeriesItem;
