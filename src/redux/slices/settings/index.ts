import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  themeMode: string;
  firstModal:boolean;
}

const initialState: SettingsState = {
  themeMode: 'light',
  firstModal: false,
  
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
    setFirstOpenModal: (state, action: PayloadAction<string>) => {
      state.firstModal = true;
    },
  }
});
export default settingsSlice.reducer;

export const { setThemeMode } = settingsSlice.actions;
