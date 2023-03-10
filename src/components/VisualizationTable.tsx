import { Box, IconButton, Typography, SvgIcon } from "@mui/material";
import { useGetSeriesDataQuery } from "../redux/query/requests";
import { VisualizationItem } from "../types";
import EnhancedTable from "./SortableTable";
import Moment from "moment";
import {
  StyledSkeletonButton,
  StyledSkeletonTitle,
  StyledSkeletonVisualization,
} from "./StyledObjects";
import ModifyVisualizationModal from "./modalItems/ModifyVisualizationModal";
import { memo, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { SystemUpdateAlt } from "@mui/icons-material";

const VisualizationTable = ({
  serie,
  english,
  date_start,
  date_end,
  text,
  texto,
  type,
  option1,
  option2,
  title,
  id,
}: VisualizationItem) => {
  const downloadImage = async () => {
    let dataUrl = "";
    if (domEl.current) {
      dataUrl = await htmlToImage.toPng(domEl.current);
    }

    // download image
    const link = document.createElement("a");
    link.download = `table-${serie}-${id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const domEl = useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useGetSeriesDataQuery({
    series: serie,
    start_date: Moment(date_start).format("YYYY-MM-DD"),
    end_date: Moment(date_end).format("YYYY-MM-DD"),
  });

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: { md: "300px" },
          maxHeight: { md: "300px" },
          width: { xs: "100%", sm: "50%" },
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <StyledSkeletonTitle /> <StyledSkeletonButton />
        </Box>
        <StyledSkeletonVisualization />
      </Box>
    );
  if (error) return <div></div>;

  const VisualizationModal = memo(() => (
    <ModifyVisualizationModal
      id={id}
      serie={serie}
      english={english}
      date_start={date_start}
      date_end={date_end}
      text={text}
      texto={texto}
      type={type}
      option1={option1}
      option2={option2}
      title={title}
    />
  ));
  return (
    <Box
      ref={domEl}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: { xs: "300px" },
        width: { xs: "100%", md: "50%" },
        p: { xs: 1, sm: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              minHeight: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title === "" ? (english ? text : texto) : title}
            <IconButton onClick={downloadImage}>
              <SvgIcon component={SystemUpdateAlt} />
            </IconButton>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <VisualizationModal />
        </Box>
      </Box>
      {data?.bmx?.series[0]?.datos?.length > 0 ? (
        <EnhancedTable
          title={title}
          id={id}
          text={text}
          texto={texto}
          serie={serie}
          english={english}
          date_start={date_start}
          date_end={date_end}
          type={type}
          option1={option1}
          option2={option2}
          data={data?.bmx?.series[0]?.datos}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            p: 2,
          }}
        >
          {" "}
          <Typography sx={{ textAlign: "center" }}>
            Rango de fechas invalido, por favor incremente el rango de busqueda
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VisualizationTable;
