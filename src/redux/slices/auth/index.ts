import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  TaskRejected,
} from "@reduxjs/toolkit";
import { Thunk } from "../../store";
import { toast } from "react-toastify";

export interface AuthState {
  accessToken: string | null;
  isLoading: Boolean;
}

export interface TokenResponse {
  token: string;
}

export const fetchLoginCredentials = createAsyncThunk(
  "users/login",
  // if you type your function argument here
  async (userId: number): Promise<any> => {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        toast.success("Logged in Successfully!", {
          position: toast.POSITION.TOP_LEFT,
        });
        resolve({ token: "Bearer assdfgodsfg#asdo1!!#4a" });
      }, 1000);
    });
    return response;
  }
);

export interface Login {
  email: string;
  password: string;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    onLogout: (state, action: PayloadAction) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLoginCredentials.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoginCredentials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action?.payload.token;
    });
  },
});

export const { setAccessToken, setIsLoading,onLogout } = authSlice.actions;

export default authSlice.reducer;

