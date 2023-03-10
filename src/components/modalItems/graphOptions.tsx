import { Select, MenuItem, Box, Typography } from "@mui/material";
import { VisualizationItemSelect } from "../../types";
import { chartTypes,chartColors,tableDecimals,tableDateFormats } from "../../types";
import { useCallback, useMemo } from "react";
const GraphNames2 = ["Pupura","Rosa","Verde","Naranja"];
import {  } from "../../types";



const GraphOptions = ({
  Option1Value,
  Option2Value,
  selectHandler1,
  selectHandler2,
  english,
  valueType,
}: VisualizationItemSelect) => {
  const IsVisualizationGraph = useCallback(
    () => valueType === "graph",
    [valueType]
  );
  let Values1 = IsVisualizationGraph() ? chartTypes : tableDecimals;
  let Values2 = IsVisualizationGraph() ? GraphNames2 : tableDateFormats;

  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: 3,
        p: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography sx={{ textAlign: "center" }}>
          {IsVisualizationGraph() ? "Type" : "Decimals:"}
        </Typography>
        <Select
          sx={{ minWidth: "135px" }}
          value={Option1Value}
          onChange={(event) => {
            selectHandler1(event);
          }}
        >
          {Values1.map((item, index) => (
            <MenuItem key={item} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography>
          {IsVisualizationGraph() ? "Graph Colors:" : "Date format:"}
        </Typography>
        <Select
          sx={{ minWidth: "135px",display:"flex" }}
          value={Option2Value}
          onChange={(event) => {
            selectHandler2(event);
          }}
        >
          {Values2.map((item, index) => (
            <MenuItem
              key={item}
              value={index}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {IsVisualizationGraph() && (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight:"3px",
                    backgroundColor: chartColors[index],
                  }}
                >
                  {"   "}
                </div>
              )}
              <div>{item}</div>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default GraphOptions;
