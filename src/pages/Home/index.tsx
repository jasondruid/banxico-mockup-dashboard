import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AddGraphModal from "../../components/AddGraphModal";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import VisualizationGraph from "../../components/VisualizationGraph";
import VisualizationTable from "../../components/VisualizationTable";
import VisualizationsList from "../../components/VisualizationsListModal";
import {
  CopyVisualizations,
  SortVisualizations,
  IsActual,
} from "../../redux/slices/visualizations";
import { toast } from "react-toastify";
import  EnhancedTable  from "../../components/SortableTable";

const index = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useCustomDispatch();
  const [reset, setReset] = useState(0);
  const { visualizations, initialVisualizations, savedValues } =
    useCustomSelector((state) => state.visualizations);

  useEffect(() => {
    dispatch(SortVisualizations(initialVisualizations));
    dispatch(IsActual());
  }, []);

  const SaveHandler = () => {
    dispatch(CopyVisualizations(visualizations));
    toast.success("Cambios guardados con éxito", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
          pb: 4,
        }}
      >
        {!savedValues && (
          <Button
            sx={{
              bgcolor: "#9e09de",
              "&:hover": {
                backgroundColor: "#7a07ab",
              },
              mt: { xs: 2, sm: 0 },
            }}
            onClick={SaveHandler}
          >
            Guardar Cambios
          </Button>
        )}
        <Typography variant="h5" component="h3" className="new-font" sx={{textAlign:{xs:"center",md:"left"}}}>
          Hola, bienvenido de nuevo!
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            gap: 1,
            py: { xs: 2, sm: 0 },
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {visualizations.length > 0 && <VisualizationsList />}
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Agregar vista
          </Button>
        </Box>
      </Box>
      <AddGraphModal
        key={reset}
        isOpen={openModal}
        closeFunction={() => {
          setOpenModal(false);
        }}
        resetFunction={() => {
          setReset((prev) => prev + 1);
        }}
      />
      {visualizations.length === 0 && (
        <Typography sx={{ width: "100%", py: 2 }}>
          Parece que no tienes ni una visualización disponible, por qué no
          agregar una?
        </Typography>
      )}
      <Box
        sx={{
          width: "100%",
          display: "inline-flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {visualizations.map((item) => {
          if (item.type === "graph")
            return <VisualizationGraph {...item} key={item.id} />;
          else {
            return <VisualizationTable key={item.id} {...item} />;
          }
        })}
      </Box>
    </Box>
  );
};

export default index;
