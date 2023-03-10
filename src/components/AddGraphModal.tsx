import { ReactElement, useRef, useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  Pagination,
  styled,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { useGetSeriesCatalogQuery } from "../redux/query/requests";
import LanguageMenu from "./modalItems/languageMenu";
import SeriesItem from "./modalItems/SeriesItem";
import { SeriesItemType, SeriesListType } from "../types";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import GraphOptions from "./modalItems/graphOptions";
import { toast } from "react-toastify";
import { useCustomDispatch } from "../hooks/redux";
import { setNewVisualization } from "../redux/slices/visualizations";
import { StyledModal,StyledSubmitButton,StyledCancelButton } from "./StyledObjects";

const style = {
  position: "absolute" as "absolute",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface ModalProps {
  isOpen: boolean;
  closeFunction: Function;
  resetFunction: Function;
}

const SimpleBox = styled(Box)(({ theme }) => ({
  padding: "10px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export default function BasicModal({
  isOpen,
  closeFunction,
  resetFunction,
}: ModalProps) {
  const titleRef = useRef<any>(null);
  const dispatch = useCustomDispatch();
  const actualDate = useRef(new Date());
  const [english, setEnglish] = useState(false);
  const [seriesPage, setSeriesPage] = useState(1);
  const { data, error, isLoading } = useGetSeriesCatalogQuery(seriesPage);
  const [selected, setSelected] = useState("");
  const [value, onChange] = useState([actualDate.current, actualDate.current]);
  const [visualizationType, setVisualizationType] = useState("table");
  const [visualizationOption1, setVisualizationOption1] = useState(0);
  const [visualizationOption2, setVisualizationOption2] = useState(0);
  const [totalPages, setTotalPage] = useState(67);

  const handleSubmit = () => {
    if (selected === "") {
      toast.error("Por favor seleccione una serie", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (value[0] === value[1]) {
      toast.error("La fecha incial y la final final no pueden ser iguales", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const selectedItem = data?.data.find(
      (item: SeriesItemType) => item.variable === selected
    );
    dispatch(
      setNewVisualization({
        id: Date.now() + Math.random(),
        serie: selected,
        english: english,
        date_start: value[0],
        date_end: value[1],
        type: visualizationType,
        texto: selectedItem.display_name,
        text: selectedItem.display_name_en,
        option1: visualizationOption1,
        option2: visualizationOption2,
        title: titleRef?.current?.value,
      })
    );

    toast.success("Visualización agregada con éxito", {
      position: toast.POSITION.TOP_RIGHT,
    });
    closeFunction();
    resetFunction();
  };

  const handleSelectItem = (index: string) => {
    setSelected(index);
  };

  const handleClose = () => {
    closeFunction();
  };

  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  return (
    <div>
      <StyledModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",

              px: 2,
              pt: 1,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione una Serie
            </Typography>
            <LanguageMenu
              changeLanguage={(isEnglish: boolean) => {
                setEnglish(isEnglish);
              }}
              isEnglish={english}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography>Titulo de la vista:</Typography>
            <TextField
              inputRef={titleRef}
              name="Titulo"
              type="text"
              id="FirstName"
              label="Titulo"
            />
          </Box>

          {isLoading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              <CircularProgress sx={{ color: "blue", margin: "auto" }} />
            </Box>
          )}
          <Box
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              justifyContent: "center",
              p: 4,
              alignItems: "center",
            }}
          >
            {data?.data?.map((item: SeriesItemType, index: number) => (
              <SeriesItem
                key={index}
                unit_id={item.unit_id}
                display_name={
                  english ? item.display_name_en : item.display_name
                }
                isSelected={item.variable === selected}
                clickHandler={() => {
                  handleSelectItem(item.variable);
                }}
              />
            ))}
          </Box>
          <SimpleBox>
            <Pagination
              count={totalPages}
              page={seriesPage}
              siblingCount={1}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setSeriesPage(value);
              }}
            />
          </SimpleBox>
          <SimpleBox>
            <Typography sx={{ py: 2 }}>Seleccione tipo de vista:</Typography>
            <Select
              value={visualizationType}
              sx={{ minWidth: "250px" }}
              onChange={(event) => {
                setVisualizationOption1(0);
                setVisualizationOption2(0);
                setVisualizationType(event.target.value);
              }}
            >
              <MenuItem value="graph">Grafico</MenuItem>
              <MenuItem value="table">Tabla</MenuItem>
            </Select>
          </SimpleBox>
          <SimpleBox>
            <Typography sx={{ py: 2 }}>
              {english
                ? "Select a date range:"
                : "Selecciona un rango de fechas:"}
            </Typography>
            <DateRangePicker
              maxDate={new Date()}
              onChange={onChange as any}
              value={value}
            />
          </SimpleBox>
          <SimpleBox>
            <GraphOptions
              valueType={visualizationType}
              english={english}
              Option1Value={visualizationOption1}
              Option2Value={visualizationOption2}
              selectHandler1={(event: any) => {
                setVisualizationOption1(event.target.value);
              }}
              selectHandler2={(event: any) => {
                setVisualizationOption2(event.target.value);
              }}
            />
          </SimpleBox>
          <SimpleBox
            sx={{
              flexDirection: "row",
              display: "inline-flex",
              gap: 8,
              width: "100%",
            }}
          >
            <StyledSubmitButton onClick={handleSubmit}>
              Submit
            </StyledSubmitButton>
            <StyledCancelButton
              onClick={() => {
                handleClose();
                resetFunction();
              }}
            >
              Cancel
            </StyledCancelButton>
          </SimpleBox>
        </Box>
      </StyledModal>
    </div>
  );
}
