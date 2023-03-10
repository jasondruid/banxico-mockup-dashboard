import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisualizationItem } from "../../../types";

export interface SettingsState {
  visualizations: Array<VisualizationItem>;
  initialVisualizations: Array<VisualizationItem>;
  savedValues: boolean;
}

const initialState: SettingsState = {
  visualizations: [],
  initialVisualizations: [],
  savedValues: true,
};

const visualizationsSlice = createSlice({
  name: "visualizations",
  initialState,
  reducers: {
    setNewVisualization: (state, action: PayloadAction<VisualizationItem>) => {
      state.visualizations = [action.payload].concat(state.visualizations);
      state.savedValues = false;
    },
    SortVisualizations: (
      state,
      action: PayloadAction<Array<VisualizationItem>>
    ) => {
      state.visualizations = action.payload;
      state.savedValues = false;
    },
    UpdateVisualization: (state, action: PayloadAction<VisualizationItem>) => {
      state.visualizations[
        state.visualizations.findIndex((item) => item.id === action.payload.id)
      ] = action.payload;
      state.savedValues = false;
    },
    CopyVisualizations: (
      state,
      action: PayloadAction<Array<VisualizationItem>>
    ) => {
      state.initialVisualizations = action.payload;
      state.savedValues = true;
    },
    IsActual: (
      state,
      action: PayloadAction
    ) => {
      state.savedValues = true;
    },
  },
});
export default visualizationsSlice.reducer;

export const {
  setNewVisualization,
  SortVisualizations,
  UpdateVisualization,
  CopyVisualizations,
  IsActual
} = visualizationsSlice.actions;
