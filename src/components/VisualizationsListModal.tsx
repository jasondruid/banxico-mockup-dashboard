import { SortableList, SortableItem } from "@thaddeusjiang/react-sortable-list";
import { useState, useEffect } from "react";
import { VisualizationItem } from "../types";
import { StyledModal } from "./StyledObjects";
import { Box, Button, Typography, SvgIcon } from "@mui/material";
import { useCustomSelector, useCustomDispatch } from "../hooks/redux";
import { CloseFullscreen, DeleteForever } from "@mui/icons-material";
import { StyledSubmitButton, StyledCancelButton } from "./StyledObjects";
import { SortVisualizations } from "../redux/slices/visualizations";
import { toast } from "react-toastify";

const DragHandler = (props: any) => (
  <div
    {...props}
    className=" flex justify-center items-center h-8 w-8 rounded border m-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 hover:text-white duration-300"
  >
    <div className="" title="drag handler">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>
    </div>
  </div>
);

const style = {
  position: "absolute" as "absolute",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

export const VisualizationsList: React.FC = () => {
  const {
    visualizations: { visualizations },
  } = useCustomSelector((state) => state);

  const [items, setItems] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useCustomDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setItems([...visualizations]);
  }, [visualizations]);

  const deleteItemFromList = (item: any) => {
    setItems((prev: any) => {
      const nArr = [...prev];
      nArr.splice(prev.indexOf(item), 1);
      return nArr;
    });
  };

  const submitResort = () => {
    if (visualizations === items) {
      handleClose();
      return;
    }

    handleClose();
    dispatch(SortVisualizations(items));
    toast.success("Vistas actualizadas con éxito", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <StyledSubmitButton sx={{mr:2}}  onClick={() => {
          setOpen(true);
        }}>Organizar Vistas</StyledSubmitButton>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              p: 2,
            }}
          >
            <Typography variant="h5">
              Reordenar y eliminar visualizaciones
            </Typography>
            <Button sx={{ backgroundColor: "red" }} onClick={handleClose}>
              Cerrar
            </Button>
          </Box>
          <SortableList items={items} setItems={setItems}>
            {({ items }) => (
              <div className="space-y-4">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    DragHandler={DragHandler}
                    className="flex border items-center"
                    style={{ width: "250px" }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        width: "40px",
                        minWidth: "30px",
                        "&:hover": {
                          backgroundColor: "#c9243a",
                        },
                        mr: 2,
                      }}
                      onClick={() => {
                        deleteItemFromList(item);
                      }}
                    >
                      <SvgIcon component={DeleteForever} />
                    </Button>
                    <Typography sx={{}}>
                      {item.english ? item.text : item.texto}
                    </Typography>
                  </SortableItem>
                ))}
              </div>
            )}
          </SortableList>
          <Box
            sx={{
              display: "inline-flex",
              gap: 3,
              justifyContent: "center",
              width: "100%",
              py: 3,
            }}
          >
            <StyledSubmitButton onClick={submitResort}>
              Guardar
            </StyledSubmitButton>
            <StyledCancelButton
              onClick={() => {
                handleClose();
                setItems(visualizations);
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

export default VisualizationsList;
