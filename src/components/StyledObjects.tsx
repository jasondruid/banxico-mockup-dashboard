import { styled } from "@mui/material/styles";
import { Modal, Button, Skeleton } from "@mui/material";

export const StyledModal = styled(Modal)(({ theme: any }) => ({
  width: "94%",
  margin: "auto",
  overflowY: "auto",
  maxHeight: "90%",
  maxWidth: "900px",
}));

export const StyledSubmitButton = styled(Button)({
  backgroundColor: "#036ffc",
  "&:hover": {
    backgroundColor: "#2d61a6",
  },
});

export const StyledCancelButton = styled(Button)({
  backgroundColor: "#de2100",
  "&:hover": {
    backgroundColor: "#852c29",
  },
});

export const StyledEditButton = styled(Button)({
  backgroundColor: "#05eb8f",
  "&:hover": {
    backgroundColor: "#13b071",
  },
});

export const StyledSkeletonTitle = styled(Skeleton)({
  width: "70%",
  padding: "8px",
  height: "50px",
});

export const StyledSkeletonVisualization = styled(Skeleton)({
  width: "100%",
  height: "90%",
});

export const StyledSkeletonButton = styled(Skeleton)({
  width: "70px",
  height:"50px"
});


