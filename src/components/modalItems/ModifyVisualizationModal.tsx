import React, { useRef, useState } from "react";
import {
  StyledCancelButton,
  StyledEditButton,
  StyledModal,
  StyledSubmitButton,
} from "../StyledObjects";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import LanguageMenu from "./languageMenu";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import GraphOptions from "./graphOptions";
import { VisualizationItem } from "../../types";
import { useCustomDispatch } from "../../hooks/redux";
import { UpdateVisualization } from "../../redux/slices/visualizations";
import { toast } from "react-toastify";
import Moment from "moment";

const ModifyVisualizationModal = ({
  id,
  serie,
  english,
  texto,
  text,
  date_start,
  date_end,
  type,
  option1,
  option2,
  title,
}: VisualizationItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(english);
  const [visualizationType, setVisualizationType] = useState(type);
  const [value, onChange] = useState<Array<Date>>([
    new Date(date_start),
    new Date(date_end),
  ]);
  const [newOption1, setOption1] = useState(option1);
  const [newOption2, setOption2] = useState(option2);
  const [newTitle, setTitle] = useState(title);
  const dispatch = useCustomDispatch();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (
      Moment(value[0]).format("YYYY-MM-DD") ===
      Moment(value[1]).format("YYYY-MM-DD")
    ) {
      toast.error("La fecha incial y la final final no pueden ser iguales", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(
      UpdateVisualization({
        id: id,
        serie: serie,
        english: isEnglish,
        texto: texto,
        text: text,
        date_start: value[0],
        date_end: value[1],
        type: visualizationType,
        option1: newOption1,
        option2: newOption2,
        title: newTitle,
      })
    );
    toast.success("Visualización modificada con éxito", {
      position: toast.POSITION.TOP_RIGHT,
    });
    handleClose();
  };

  return (
    <>
      <StyledEditButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Editar
      </StyledEditButton>
      <StyledModal open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            bgcolor: "background.paper",
            border: "2px solid #000",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "right" }}>
            <StyledCancelButton sx={{ mx: 3, mt: 3 }} onClick={handleClose}>
              Cerrar
            </StyledCancelButton>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Idioma: </Typography>
            <LanguageMenu
              isEnglish={isEnglish}
              changeLanguage={(value: boolean) => {
                setIsEnglish(value);
              }}
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
              flexDirection: { xs: "column" },
            }}
          >
            <Typography>Titulo de la vista:</Typography>
            <TextField
              value={newTitle}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              name="Titulo"
              type="text"
              id="FirstName"
              data-testid="titulo"
              label="Titulo"
              placeholder="titulo"
              role="textbox"
            />
          </Box>
          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ py: 2, textAlign: "center" }}>
              Seleccione tipo de vista:
            </Typography>
            <Select
              value={visualizationType}
              sx={{ minWidth: "250px" }}
              onChange={(event) => {
                setVisualizationType(event.target.value);
                setOption1(0);
                setOption2(0);
              }}
            >
              <MenuItem value="graph">Grafico</MenuItem>
              <MenuItem value="table">Tabla</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography sx={{ py: 2 }}>
              Selecciona un rango de fechas:
            </Typography>
            <DateRangePicker
              maxDate={new Date()}
              onChange={onChange as any}
              value={value}
            />
          </Box>
          <Box>
            <GraphOptions
              Option1Value={newOption1}
              Option2Value={newOption2}
              selectHandler1={(event: any) => {
                setOption1(event.target.value);
              }}
              selectHandler2={(event: any) => {
                setOption2(event.target.value);
              }}
              valueType={visualizationType}
              english={isEnglish}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              gap: 3,
              justifyContent: "center",
              width: "100%",
              py: 3,
            }}
          >
            <StyledSubmitButton onClick={handleSubmit}>
              Guardar
            </StyledSubmitButton>
            <StyledCancelButton
              onClick={() => {
                handleClose();
              }}
            >
              Cancelar
            </StyledCancelButton>
          </Box>
        </Box>
      </StyledModal>
    </>
  );
};

export default ModifyVisualizationModal;
