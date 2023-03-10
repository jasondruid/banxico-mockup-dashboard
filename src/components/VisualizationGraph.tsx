import { useGetSeriesDataQuery } from "../redux/query/requests";
import { VisualizationItem } from "../types";
import Chart from "react-apexcharts";
import Moment from "moment";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { chartTypes } from "../types";
import {
  StyledSkeletonButton,
  StyledSkeletonTitle,
  StyledSkeletonVisualization,
} from "./StyledObjects";
import { chartColors } from "../types";
import ModifyVisualizationModal from "./modalItems/ModifyVisualizationModal";
import { memo } from "react";

const VisualizationGraph = ({
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
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("md"));
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

  const VisualizationModal = memo(
    () => (
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
    )
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: { xs: "200px" },
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
          </Typography>
        </Box>
        <Box>
          <VisualizationModal />
        </Box>
      </Box>
      {data?.bmx?.series[0]?.datos?.length > 0 ? (
        <Chart
          options={{
            colors: [chartColors[option2]],
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: data?.bmx?.series[0]?.datos?.map(
                (item: { fecha: string; dato: string }) => item.fecha
              ),
            },
          }}
          value={684}
          series={[
            {
              name: lgScreen
                ? english
                  ? text
                  : texto
                : english
                ? text.substring(0, 40)
                : texto.substring(0, 40),
              data: data?.bmx?.series[0]?.datos?.map(
                (item: { fecha: string; dato: string }) =>
                  parseFloat(item.dato.replaceAll(",", ""))
              ),
            },
          ]}
          type={chartTypes[option1] as any}
          width="100%"
          height="100%"
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

export default VisualizationGraph;
