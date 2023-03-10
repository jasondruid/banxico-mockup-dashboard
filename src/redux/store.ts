import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./slices/settings";
import visualizationsReducer from './slices/visualizations';
import { banxicoApi } from "./query/requests";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};

const persistSettingsConfig = {
  key: "settings",
  storage,
  whitelist: ["themeMode","firstModal"],
};

const persistVisualizationsConfig = {
  key: "visualizations",
  storage,
  whitelist: ["visualizations","initialVisualizations","savedValues"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistAuthConfig,
      authReducer
    ),
    settings: persistReducer<ReturnType<typeof settingsReducer>>(
      persistSettingsConfig,
      settingsReducer
    ),
    visualizations: persistReducer<ReturnType<typeof visualizationsReducer>>(
      persistVisualizationsConfig,
      visualizationsReducer
    ),
    [banxicoApi.reducerPath]: banxicoApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(banxicoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;
export const persistor = persistStore(store);

export default store;
